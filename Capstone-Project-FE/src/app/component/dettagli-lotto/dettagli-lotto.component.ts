import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Foto } from 'src/app/models/foto.interface';
import { Notifica } from 'src/app/models/notifica.interface';
import { FotoService } from 'src/app/services/foto.service';
import { NotificheService } from 'src/app/services/notifiche.service';
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

  @Output() aggiungiNotifica = new EventEmitter<Opera>();

  utente: Utente | undefined;
  opera: Opera | undefined;
  idOpera!: number;
  listaPreferiti: Opera[] = [];
  listaOfferte: Offerta[] = [];
  listaFoto: Foto[] = [];
  errore = ""

  constructor(private us: UtentiService, private os: OpereService, private ofs: OfferteService, private fs: FotoService, private ss: StorageService, private ar: ActivatedRoute, private ns: NotificheService, private router: Router) { }

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

  // Per aggiornare lo stato del lotto in 'SCADUTO' quando il countdown arriva a 0 e inviare la notifica all'utente
  timerScaduto(opera: Opera) {
    this.os.updateOpera(opera, opera.id).subscribe(() => {
      const operaAggiornata = {
        ...opera,
        statoLotto: 'SCADUTO',
      };

      this.os.updateOpera(operaAggiornata, opera.id).subscribe(() => {
        console.log('Lotto scaduto');
        this.calcoloAstaAggiudicata().then((messaggio) => {
          this.creaNotifica(opera.autore, opera, messaggio);
          // this.creaNotifica(opera.offerte[0].utente, opera, messaggio);
        });
      });
    });
  }

  creaNotifica(destinatario: Utente, opera: Opera, messaggio: string) {
    const nuovaNotifica: Partial<Notifica> = {
      utente: destinatario,
      opera: opera,
      messaggio: messaggio,
    };

    this.ns.addNotifica(nuovaNotifica).subscribe((notifica) => {
      console.log('Notifica aggiunta correttamente', notifica);
    });
  }

  calcoloAstaAggiudicata(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.trovaUltimaOfferta((ultimaOfferta) => {
        if (ultimaOfferta == undefined || ultimaOfferta.offerta <= 1) {
          resolve("Ci dispiace, ma non sono state effettuate offerte per la tua opera");
        } else if (ultimaOfferta.offerta < this.opera!.prezzoMinimo) {
          resolve("Ci dispiace, ma le offerte effettuate dagli utenti non hanno raggiunto il prezzo minimo da te inserito. L'asta è annullata");
        } else {
          this.creaNotifica(ultimaOfferta.utente, ultimaOfferta.opera, "Complimenti! Ti sei aggiudicato l'asta del lotto n. " + ultimaOfferta.opera.id);
          console.log(ultimaOfferta.utente);

          resolve('Asta terminata! Il tuo lotto è stato venduto all\'utente ' + ultimaOfferta.utente.nome + ' ' + ultimaOfferta.utente.cognome + ' al prezzo di €' + ultimaOfferta.offerta);
        }
      });
    });
  }

}
