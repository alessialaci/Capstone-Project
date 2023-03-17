import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/auth/storage.service';
import { Opera } from 'src/app/models/opera.interface';
import { Utente } from 'src/app/models/utente.interface';
import { OpereService } from 'src/app/services/opere.service';
import { UtentiService } from 'src/app/services/utenti.service';

@Component({
  selector: 'app-notifiche',
  templateUrl: './notifiche.component.html',
  styleUrls: ['./notifiche.component.scss']
})
export class NotificheComponent implements OnInit {

  listaOpere: Opera[] | undefined;
  utenteId!: number;

  constructor(private ss: StorageService, private os: OpereService, private us: UtentiService) { }

  ngOnInit(): void {
    const utente = this.ss.getUser();
    this.utenteId = utente.id;
    this.getLotti();
  }

  getLotti() {
    this.os.getOpere().subscribe(opere => {
      this.listaOpere = opere.filter(opera => opera.autore.id === this.utenteId);
    })
  }

}
