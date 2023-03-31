import { Component, OnInit, ViewChild } from '@angular/core';
import { TipoOpera } from 'src/app/enums/tipo-opera.enum';
import { Opera } from 'src/app/models/opera.interface';
import { OpereService } from 'src/app/services/opere.service';

@Component({
  selector: 'app-lista-lotti',
  templateUrl: './lista-lotti.component.html',
  styleUrls: ['./lista-lotti.component.scss']
})
export class ListaLottiComponent implements OnInit {

  listaOpere: Opera[] = [];
  termineRicerca = '';
  paginaCorrente: number = 1;

  constructor(private os: OpereService) { }

  ngOnInit(): void {
    this.getLotti();
  }

  getLotti() {
    this.os.getOpere().subscribe(opere => {
      this.listaOpere = opere.reverse().filter(opera => opera.statoLotto === "APPROVATO");
    })
  }

  filtrareOpere() {
    if (!this.termineRicerca || this.termineRicerca.trim() === '') {
      this.getLotti();
    } else {
      this.listaOpere = this.listaOpere.filter(opera =>
        opera.titolo.toLowerCase().includes(this.termineRicerca.toLowerCase()) || opera.autore.nome.toLowerCase().includes(this.termineRicerca.toLowerCase()) || opera.autore.cognome.toLowerCase().includes(this.termineRicerca.toLowerCase())
      );
    }
  }

  cercaDipinti() {
    this.os.getOpereByTipo(TipoOpera.DIPINTO).subscribe(dipinti => {
      this.listaOpere = dipinti.filter(dipinti => dipinti.statoLotto === 'APPROVATO');
    })
  }

  cercaDisegni() {
    this.os.getOpereByTipo(TipoOpera.DISEGNO).subscribe(disegni => {
      this.listaOpere = disegni.filter(disegni => disegni.statoLotto === 'APPROVATO');
    })
  }

  cercaFotografie() {
    this.os.getOpereByTipo(TipoOpera.FOTOGRAFIA).subscribe(foto => {
      this.listaOpere = foto.filter(foto => foto.statoLotto === 'APPROVATO');
    })
  }

  cercaSculture() {
    this.os.getOpereByTipo(TipoOpera.SCULTURA).subscribe(sculture => {
      this.listaOpere = sculture.filter(sculture => sculture.statoLotto === 'APPROVATO');
    })
  }

  cercaFumetti() {
    this.os.getOpereByTipo(TipoOpera.FUMETTO).subscribe(fumetti => {
      this.listaOpere = fumetti.filter(fumetti => fumetti.statoLotto === 'APPROVATO');
    })
  }

}
