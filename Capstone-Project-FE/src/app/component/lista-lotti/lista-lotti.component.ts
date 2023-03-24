import { Component, OnInit } from '@angular/core';
import { Foto } from 'src/app/models/foto.interface';
import { Opera } from 'src/app/models/opera.interface';
import { FotoService } from 'src/app/services/foto.service';
import { OpereService } from 'src/app/services/opere.service';

@Component({
  selector: 'app-lista-lotti',
  templateUrl: './lista-lotti.component.html',
  styleUrls: ['./lista-lotti.component.scss']
})
export class ListaLottiComponent implements OnInit {

  listaOpere: Opera[] | undefined;

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
