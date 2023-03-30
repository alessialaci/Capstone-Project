import { Component, OnInit, ViewChild } from '@angular/core';
import { Opera } from 'src/app/models/opera.interface';
import { OpereService } from 'src/app/services/opere.service';

@Component({
  selector: 'app-lista-lotti',
  templateUrl: './lista-lotti.component.html',
  styleUrls: ['./lista-lotti.component.scss']
})
export class ListaLottiComponent implements OnInit {

  listaOpere: Opera[] = [];

  constructor(private os: OpereService) { }

  ngOnInit(): void {
    this.getLotti();
  }

  getLotti() {
    this.os.getOpere().subscribe(opere => {
      this.listaOpere = opere.filter(opera => opera.statoLotto === "APPROVATO");
    })
  }

}
