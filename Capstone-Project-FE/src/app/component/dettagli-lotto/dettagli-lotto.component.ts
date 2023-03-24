import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Foto } from 'src/app/models/foto.interface';
import { FotoService } from 'src/app/services/foto.service';
import { StorageService } from '../../auth/storage.service';
import { Offerta } from '../../models/offerta.interface';
import { Opera } from '../../models/opera.interface';
import { Utente } from '../../models/utente.interface';
import { OfferteService } from '../../services/offerte.service';
import { OpereService } from '../../services/opere.service';
import { UtentiService } from '../../services/utenti.service';

@Component({
  selector: 'app-dettagli-lotto',
  templateUrl: './dettagli-lotto.component.html',
  styleUrls: ['./dettagli-lotto.component.scss']
})
export class DettagliLottoComponent implements OnInit {

  utente: Utente | undefined;
  opera: Opera | undefined;
  idOpera!: number;
  listaPreferiti: Opera[] = [];
  listaOfferte: Offerta[] = [];
  listaFoto: Foto[] = [];
  errore = ""

  constructor(private us: UtentiService, private os: OpereService, private ofs: OfferteService, private fs: FotoService, private ss: StorageService, private ar: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.idOpera = this.ar.snapshot.params["id"];

    this.os.getOperaById(this.idOpera).subscribe(o => {
      this.opera = o;
      this.trovaFoto(o);
      this.trovaOfferte();
    });

    const utenteId = this.ss.getUser().id;

    if (utenteId) {
      this.us.getUtenteById(utenteId).subscribe((utente: Utente) => {
        this.utente = utente;
        this.listaPreferiti = utente.preferiti ?? [];
      });
    }
  }

  confermaOfferta(form: NgForm) {
    const conferma = window.confirm(`Confermi l'offerta di €${form.value.offerta}?`);

    if (conferma) {
      if (!this.ss.isLoggedIn()) {
        this.router.navigate(['/login']);
        return;
      }

      if (this.opera!.autore && this.opera!.autore.id === this.utente?.id) {
        this.errore = "Non puoi fare un'offerta per una tua opera";
        return;
      }

      if (this.opera!.timer && this.opera!.timer.giorni === 0 && this.opera!.timer.ore === 0 && this.opera!.timer.minuti === 0 && this.opera!.timer.secondi === 0) {
        this.errore = 'Il timer è scaduto! Non è più possibile fare offerte per questo lotto';
        return;
      }

      this.trovaUltimaOfferta((ultimaOfferta) => {
        if ((ultimaOfferta == undefined && form.value.offerta > 1) || (ultimaOfferta!.offerta !== undefined && form.value.offerta > ultimaOfferta!.offerta)) {
          const nuovaOfferta: Partial<Offerta> = {
            data: new Date(),
            opera: this.opera,
            utente: this.utente,
            offerta: form.value.offerta
          };

          this.ofs.addOfferta(nuovaOfferta).subscribe((response) => {
            this.errore = 'Offerta aggiunta con successo';
            console.log('Offerta aggiunta con successo', response);
            this.trovaOfferte();
          });
        } else if ((ultimaOfferta !== undefined && form.value.offerta < ultimaOfferta!.offerta) || (ultimaOfferta == undefined && form.value.offerta < 1)) {
          this.errore = "Non puoi fare un'offerta minore della precedente di €" + (ultimaOfferta?.offerta ? ultimaOfferta.offerta : 1);
          return;
        } else {
          this.errore = "L'offerta non può essere uguale o inferiore alla precedente di €" + ultimaOfferta?.offerta;
          return;
        }
      });
    } else {
      this.errore = "Offerta non confermata";
      return;
    }
  }

  trovaUltimaOfferta(callback: (ultimaOfferta: Offerta | undefined) => void) {
    this.ofs.getOfferteByOperaId(this.opera!).subscribe(offerte => {
      if (offerte.length > 0) {
        offerte.sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());
        callback(offerte[offerte.length - 1]);
      } else {
        callback(undefined);
      }
    });
  }

  trovaOfferte() {
    this.ofs.getOfferteByOperaId(this.opera!).subscribe(offerte => {
      this.listaOfferte = offerte.reverse();
    });
  }

  trovaFoto(opera: Opera) {
    this.fs.getFotoByOperaId(opera).subscribe(foto => {
      this.listaFoto = foto;
    });
  }

  aggiungiAiPreferiti() {
    if (this.opera && this.utente) {
      this.listaPreferiti.push(this.opera);

      const utenteAggiornato: Utente = {
        ...this.utente,
        preferiti: this.listaPreferiti
      }

      this.us.updateUtente(utenteAggiornato).subscribe((response) => {
        console.log("Utente aggiornato con successo", response);
      })
    }
  }

}
