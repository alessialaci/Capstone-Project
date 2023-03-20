import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/auth/storage.service';
import { Opera } from 'src/app/models/opera.interface';
import { OpereService } from 'src/app/services/opere.service';
import { UtentiService } from 'src/app/services/utenti.service';
import { TimerComponent } from '../timer/timer.component';

@Component({
  selector: 'app-notifiche',
  templateUrl: './notifiche.component.html',
  styleUrls: ['./notifiche.component.scss']
})
export class NotificheComponent implements OnInit {

  listaOpere: Opera[] | undefined;
  utenteId!: number;
  oggi = new Date();
  isAdmin = false;

  constructor(private ss: StorageService, private os: OpereService, private us: UtentiService) { }

  ngOnInit(): void {
    const utente = this.ss.getUser();
    this.utenteId = utente.id;

    if(utente.roles[0] == 'ROLE_ADMIN') {
      this.isAdmin = true;
      this.getLottiAdmin()
    } else if(utente.roles[0] == 'ROLE_USER') {
      this.isAdmin = false;
      this.getLottiUser();
    } else {
      console.log("Errore nel caricamento delle notifiche");
    }
  }

  getLottiUser() {
    this.os.getOpere().subscribe(opere => {
      this.listaOpere = opere.filter(opera =>
        opera.autore.id === this.utenteId && opera.statoLotto !== "IN_ATTESA"
      );
    })
  }

  getLottiAdmin() {
    this.os.getOpere().subscribe(opere => {
      this.listaOpere = opere.filter(opera => opera.statoLotto === "IN_ATTESA");
    })
  }

  confermaLotto(id: number) {
    this.os.getOperaById(id).subscribe(opera => {
      const scadenzaTimer = new Date(this.oggi.getTime() + 7 * 24 * 60 * 60 * 1000);
      const operaAggiornata = {
        ...opera,
        statoLotto: 'APPROVATO',
        timer: new TimerComponent(),
        scadenzaTimer: scadenzaTimer
      };
      console.log('Data di scadenza aggiornata: ', operaAggiornata.scadenzaTimer);
      this.os.updateOpera(operaAggiornata, id).subscribe(() => {
        console.log('Lotto confermato');
        this.getLottiAdmin();
      });
    });
  }

  rifiutaLotto(id: number) {
    this.os.getOperaById(id).subscribe(opera => {
      const operaAggiornata = { ...opera, statoLotto: 'RIFIUTATO' };
      this.os.updateOpera(operaAggiornata, id).subscribe(() => {
        console.log('Lotto rifiutato');
        this.getLottiAdmin();
      });
    });
  }

}
