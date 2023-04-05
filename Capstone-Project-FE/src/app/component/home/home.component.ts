import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/auth/storage.service';
import { Opera } from 'src/app/models/opera.interface';
import { OpereService } from 'src/app/services/opere.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  listaUltimeOpere: Opera[] = [];
  listaOpereInScadenza: Opera[] = [];
  utente: any;
  traUnOra = new Date(new Date().getTime() + 3600000);
  oggi = new Date();

  constructor(private os: OpereService, private ss: StorageService) { }

  ngOnInit(): void {
    this.getUlimiLotti();
    this.getLottiInScadenza();
    this.utente = this.ss.getUser();
  }

  getUlimiLotti() {
    this.os.getOpere().subscribe(opere => {
      this.listaUltimeOpere = opere.filter(opera => opera.statoLotto === "APPROVATO").slice(-3);
    })
  }

  getLottiInScadenza() {
    this.os.getOpere().subscribe(opere => {
      this.listaOpereInScadenza = opere.filter(opera => opera.statoLotto === "APPROVATO" && new Date(opera.scadenzaTimer) > this.oggi && new Date(opera.scadenzaTimer) < this.traUnOra).slice(-3);
    })
  }

  convertiLocalDateTimeInDate(localDateTime: any): Date {
    return new Date(localDateTime);
  }

}
