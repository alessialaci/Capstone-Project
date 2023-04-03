import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/auth/storage.service';
import { Ordine } from 'src/app/models/ordine.interface';
import { OrdiniService } from 'src/app/services/ordini.service';

declare var paypal: any;

@Component({
  selector: 'app-ordini',
  templateUrl: './ordini.component.html',
  styleUrls: ['./ordini.component.scss']
})
export class OrdiniComponent implements OnInit {

  utenteSS: any;
  listaOrdini: Ordine[] = [];
  prezzo = 0;
  speseTrasporto = 0;
  commissioni = 0;
  valuta = '';

  constructor(private ors: OrdiniService, private ss: StorageService) { }

  ngOnInit(): void {
    this.utenteSS = this.ss.getUser();

    if(this.utenteSS) {
      this.getOrdini();
    }
  }

  getOrdini() {
    this.ors.getOrdiniByUtente(this.utenteSS).subscribe(ordini => {
      this.listaOrdini = ordini;
      this.creaBottoni(this.listaOrdini);
    })
  }

  async creaBottoni(ordini: Ordine[]) {
    let somma = 0;

    for(let i = 0; i < ordini.length; i++) {
      somma += ordini[i].totale;
      this.prezzo += ordini[i].prezzo;
      this.speseTrasporto += ordini[i].speseTrasporto;
      this.commissioni += ordini[i].commissione;
      this.valuta = ordini[i].valuta;
    }

    try {
      paypal.Buttons({
        createOrder: function(data: any, actions: any) {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: somma.toString(),
              }
            }]
          });
        },
        onApprove: (data: any, actions: any) => {
          this.eliminaOrdini();
        },
        onCancel: function(data: any, actions: any) {
          console.log('Transazione annullata');
        }
      }).render('#paypal-button-container');
    } catch (error) {
      console.error("failed to render the PayPal Buttons", error);
    }
  }

  eliminaOrdini() {
    for(let i = 0; i < this.listaOrdini.length; i++) {
      this.ors.deleteOrdine(this.listaOrdini[i].id).subscribe(response => {
        console.log('Ordine cancellato con successo', response);
        window.location.href = '/';
      });
    }
  }

}
