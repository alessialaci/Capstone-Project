import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { StorageService } from 'src/app/auth/storage.service';
import { Notifica } from 'src/app/models/notifica.interface';
import { Opera } from 'src/app/models/opera.interface';
import { Utente } from 'src/app/models/utente.interface';
import { NotificheService } from 'src/app/services/notifiche.service';
import { OpereService } from 'src/app/services/opere.service';
import { UtentiService } from 'src/app/services/utenti.service';

@Component({
  selector: 'app-notifiche',
  templateUrl: './notifiche.component.html',
  styleUrls: ['./notifiche.component.scss']
})
export class NotificheComponent implements OnInit {

  utente: Utente | undefined;
  utenteSS: any;
  listaOpere: Opera[] | undefined;
  listaNotifiche: Notifica[] | undefined;
  notificheVisualizzate: Notifica[] = [];
  utenteId!: number;
  isAdmin = false;

  constructor(private ss: StorageService, private os: OpereService, private us: UtentiService, private ns: NotificheService) { }

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

  confermaLotto(opera: Opera, notifica: Notifica) {
    this.notificaVisualizzata(notifica);
    const oggi = new Date();
    this.os.getOperaById(opera.id).subscribe(opera => {
      // const scadenzaTimer = new Date(oggi.getTime() + 7 * 24 * 60 * 60 * 1000);
      const scadenzaTimer = new Date(oggi.getTime() + (60 * 60 * 1000) + (20 * 60 * 1000)).toISOString();
      console.log(scadenzaTimer);

      const operaAggiornata = {
        ...opera,
        statoLotto: 'APPROVATO',
        scadenzaTimer: scadenzaTimer
      };
      console.log('Data di scadenza aggiornata: ', operaAggiornata.scadenzaTimer);
      this.os.updateOpera(operaAggiornata, opera.id).subscribe(() => {
        console.log('Lotto confermato');
        this.creaNotifica(opera, "Il tuo lotto è stato confermato");
        this.getNotificheAdmin();
      });
    });
  }

  rifiutaLotto(opera: Opera, notifica: Notifica) {
    this.notificaVisualizzata(notifica);
    this.os.getOperaById(opera.id).subscribe(opera => {
      const operaAggiornata = { ...opera, statoLotto: 'RIFIUTATO' };
      this.os.updateOpera(operaAggiornata, opera.id).subscribe(() => {
        console.log('Lotto rifiutato');
        this.creaNotifica(opera, "Il tuo lotto è stato rifiutato");
        this.getNotificheAdmin();
      });
    });
  }

  creaNotifica(opera: Opera, messaggio: string) {
    const nuovaNotifica: Partial<Notifica> = {
      utente: opera.autore,
      opera: opera,
      messaggio: messaggio
    };

    this.ns.addNotifica(nuovaNotifica).subscribe(notifica => {
      console.log("Notifica aggiunta correttamente", notifica);
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
    })
  }




  // if (this.opera!.stato === 'SCADUTO') {
  //   this.errore = 'Il timer è scaduto! Non è più possibile fare offerte per questo lotto';
  //   return;
  // }

  // trovaUltimaOfferta(callback: (ultimaOfferta: Offerta | undefined) => void) {
  //   this.ofs.getOfferteByOperaId(this.opera!).subscribe(offerte => {
  //     if (offerte.length > 0) {
  //       offerte.sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());
  //       callback(offerte[offerte.length - 1]);
  //     } else {
  //       callback(undefined);
  //     }
  //   });
  // }

}
