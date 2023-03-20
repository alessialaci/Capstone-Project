import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private us: UtentiService, private os: OpereService, private ofs: OfferteService, private ss: StorageService, private ar: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.idOpera = this.ar.snapshot.params["id"];
    this.os.getOperaById(this.idOpera).subscribe(o => {
      this.opera = o;
    });

    const utenteId = this.ss.getUser()?.id;

    if (utenteId) {
      this.us.getUtenteById(utenteId).subscribe((utente: Utente) => {
        this.utente = utente;
        this.listaPreferiti = utente.preferiti ?? [];
      });
    }
  }

  confermaOfferta(form: NgForm) {
    if (this.opera!.timer && this.opera!.timer.giorni === 0 && this.opera!.timer.ore === 0 && this.opera!.timer.minuti === 0 && this.opera!.timer.secondi === 0) {
      alert('Il timer è scaduto! Non è più possibile fare offerte per questo lotto.');
    } else {
      if(this.ss.isLoggedIn() && this.opera && this.utente) {
        const nuovaOfferta: Partial<Offerta> = {
          data: new Date(),
          opera: this.opera,
          utente: this.utente,
          offerta: form.value.offerta
        };

        this.ofs.addOfferta(nuovaOfferta).subscribe((response) => {
          console.log('Offerta aggiunta con successo', response);
        });
      } else {
        this.router.navigate(["/login"])
      }
    }
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
