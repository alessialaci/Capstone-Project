import { Component, OnInit } from '@angular/core';
import { Opera } from 'src/app/models/opera.interface';
import { StorageService } from 'src/app/auth/storage.service';
import { OpereService } from 'src/app/services/opere.service';

@Component({
  selector: 'app-aste-utente',
  templateUrl: './aste-utente.component.html',
  styleUrls: ['./aste-utente.component.scss']
})
export class AsteUtenteComponent implements OnInit {

  utente: any;
  listaOpere: Opera[] = [];
  paginaCorrente: number = 1;

  constructor(private ss: StorageService, private os: OpereService) { }

  ngOnInit(): void {
    this.utente = this.ss.getUser();
    this.getLotti(this.utente);
  }

  getLotti(utente: any) {
    this.os.getOpere().subscribe(opere => {
      this.listaOpere = opere.reverse().filter(opera => opera.autore.id == utente.id);
    })
  }

}
