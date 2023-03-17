import { Component, OnInit } from '@angular/core';
import { Opera } from 'src/app/models/opera.interface';
import { OpereService } from 'src/app/services/opere.service';

@Component({
  selector: 'app-richieste-lotti',
  templateUrl: './richieste-lotti.component.html',
  styleUrls: ['./richieste-lotti.component.scss']
})
export class RichiesteLottiComponent implements OnInit {

  listaOpere: Opera[] | undefined;

  constructor(private os: OpereService) { }

  ngOnInit(): void {
    this.getLotti();
  }

  getLotti() {
    this.os.getOpere().subscribe(opere => {
      this.listaOpere = opere.filter(opera => opera.statoLotto === "IN_ATTESA");
    })
  }

  confermaLotto(id: number) {
    this.os.getOperaById(id).subscribe(opera => {
      const operaAggiornata = { ...opera, statoLotto: 'APPROVATO' };
      this.os.updateOpera(operaAggiornata, id).subscribe(() => {
        console.log('Lotto confermato');
        this.getLotti();
      });
    });
  }

  rifiutaLotto(id: number) {
    this.os.getOperaById(id).subscribe(opera => {
      const operaAggiornata = { ...opera, statoLotto: 'RIFIUTATO' };
      this.os.updateOpera(operaAggiornata, id).subscribe(() => {
        console.log('Lotto rifiutato');
        this.getLotti();
      });
    });
  }



}
