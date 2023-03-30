import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/auth/storage.service';
import { Notifica } from 'src/app/models/notifica.interface';
import { Opera } from 'src/app/models/opera.interface';
import { Utente } from 'src/app/models/utente.interface';
import { NotificheService } from 'src/app/services/notifiche.service';
import { UtentiService } from 'src/app/services/utenti.service';

@Component({
  selector: 'app-notifiche',
  templateUrl: './notifiche.component.html',
  styleUrls: ['./notifiche.component.scss']
})
export class NotificheComponent implements OnInit {

  utenteSS: any;
  utenteId!: number;
  utente: Utente | undefined;
  listaOpere: Opera[] | undefined;
  listaNotifiche: Notifica[] = [];
  notificheVisualizzate: Notifica[] = [];
  isAdmin = false;

  constructor(private ar: ActivatedRoute, private ss: StorageService, private ns: NotificheService, private us: UtentiService, private router: Router) { }

  ngOnInit(): void {
    this.utenteSS = this.ss.getUser();
    this.utenteId = this.utenteSS.id;

    this.us.getUtenteById(this.utenteId).subscribe(ut => {
      this.utente = ut;

      if(this.utenteSS) {
        if(this.utenteSS.roles[0] == 'ROLE_ADMIN') {
          this.isAdmin = true;
          this.getNotificheAdmin();
        } else if(this.utenteSS.roles[0] == 'ROLE_USER') {
          this.isAdmin = false;
          this.getNotificheUser();
        } else {
          console.log("Errore nel caricamento delle notifiche");
        }
      }
    })
  }

  getNotificheUser() {
    this.ns.getNotificheByUtente(this.utente!).subscribe(notifiche => {
      this.listaNotifiche = notifiche.filter(notifica => notifica.opera.statoLotto !== "IN_ATTESA").sort((a, b) => {
        return b.id - a.id;
      });
    })
  }

  getNotificheAdmin() {
    this.ns.getNotificheByUtente(this.utente!).subscribe(notifiche => {
      this.listaNotifiche = notifiche.sort((a, b) => {
        return b.id - a.id;
      });
    })
  }

  notificaVisualizzata(notifica: Notifica) {
    const aggiornaNotifica: Partial<Notifica> = {
      ...notifica,
      visualizzato: true
    };

    this.ns.updateNotifica(aggiornaNotifica).subscribe(notifica => {
      console.log("Notifica aggiornata correttamente", notifica);

      if(this.utenteSS.roles[0] == 'ROLE_ADMIN') {
        this.getNotificheAdmin();
      } else if(this.utenteSS.roles[0] == 'ROLE_USER') {
        this.getNotificheUser();
      }
    });
    this.router.navigate(['/dettagli-notifiche/', notifica.id]);
  }

}
