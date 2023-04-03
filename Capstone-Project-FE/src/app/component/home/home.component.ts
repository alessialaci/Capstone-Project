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
  utente: any;

  constructor(private os: OpereService, private ss: StorageService) { }

  ngOnInit(): void {
    this.getUlimiLotti();
    this.utente = this.ss.getUser();
  }

  getUlimiLotti() {
    this.os.getOpere().subscribe(opere => {
      this.listaUltimeOpere = opere.filter(opera => opera.statoLotto === "APPROVATO").slice(-3);
    })
  }

}
