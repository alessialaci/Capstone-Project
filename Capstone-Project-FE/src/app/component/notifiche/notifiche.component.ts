import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Notifica } from 'src/app/models/notifica.interface';
import { Utente } from 'src/app/models/utente.interface';
import { StorageService } from 'src/app/auth/storage.service';
import { NotificheService } from 'src/app/services/notifiche.service';
import { UtentiService } from 'src/app/services/utenti.service';

@Component({
  selector: 'app-notifiche',
  templateUrl: './notifiche.component.html',
  styleUrls: ['./notifiche.component.scss']
})
export class NotificheComponent implements OnInit {

  utenteSS: any;
  utente: Utente | undefined;
  listaNotifiche: Notifica[] = [];
  isAdmin = false;

  constructor(private ss: StorageService, private ns: NotificheService, private us: UtentiService, private router: Router) { }

  ngOnInit(): void {
    this.utenteSS = this.ss.getUser();
    this.getUtente(this.utenteSS.id);
  }

  // Per recuperare l'utente loggato e le sue notifica
  getUtente(id: number) {
    this.us.getUtenteById(id).subscribe(ut => {
      this.utente = ut;

      if(this.utenteSS) {
        if(this.utenteSS.roles[0] == 'ROLE_ADMIN') {
          this.getNotificheAdmin();
        } else if(this.utenteSS.roles[0] == 'ROLE_USER') {
          this.getNotificheUser();
        } else {
          console.log("Errore nel caricamento delle notifiche");
        }
      }
    })
  }

  // Per recuperare tutte le notifiche dell'admin loggato
  getNotificheAdmin() {
    this.isAdmin = true;

    this.ns.getNotificheByUtente(this.utente!).subscribe(notifiche => {
      this.listaNotifiche = notifiche.sort((a, b) => {
        return b.id - a.id;
      });
    })
  }

  // Per recuperare tutte le notifiche dell'utente loggato
  getNotificheUser() {
    this.isAdmin = false;

    this.ns.getNotificheByUtente(this.utente!).subscribe(notifiche => {
      this.listaNotifiche = notifiche.filter(notifica => notifica.opera.statoLotto !== "IN_ATTESA").sort((a, b) => {
        return b.id - a.id;
      });
    })
  }

  // Per aggiornare la notifica a 'visualizzata' quando un utente ci clicca su
  notificaVisualizzata(notifica: Notifica) {
    const aggiornaNotifica: Partial<Notifica> = {
      ...notifica,
      visualizzato: true
    };

    this.ns.updateNotifica(aggiornaNotifica).subscribe(notifica => {
      if(this.utenteSS.roles[0] == 'ROLE_ADMIN') {
        this.getNotificheAdmin();
      } else if(this.utenteSS.roles[0] == 'ROLE_USER') {
        this.getNotificheUser();
      }
    });

    this.router.navigate(['/dettagli-notifiche/', notifica.id]);
  }

}
