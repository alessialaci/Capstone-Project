import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { loadScript } from "@paypal/paypal-js";
import { Ordine } from 'src/app/models/ordine.interface';

declare var paypal: any;

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.scss']
})
export class PagamentoComponent implements OnInit {

  // paypal: any;
  // paypalReady = false;
  // error = '';
  // orderId = '';
  // orderAmount!: number;
  // orderCurrency = '';
  // paymentComplete = false;

  @ViewChild('paypal', { static: true }) paypalElement!: ElementRef;

  prodotto = {
    descrizione: 'Test',
    prezzo: 50.99
  }
  paidFor = false;

  constructor() { }

  ngOnInit(): void {
    this.creaBottoni();
  }

  // generatePayment(importo: string) {
  //   if(importo = '') {
  //     alert("Inserire un importo valido");
  //     return;
  //   }
  //   this.paypal.Buttons({
  //     createOrder: function(data: any, actions: any) {
  //       return actions.order.create({
  //         purchase_units: [{
  //           amount: {
  //             value: importo
  //           }
  //         }]
  //       });
  //     },
  //     onApprove: function(data: any, actions: any) {
  //       return actions.order.capture().then(function(details: any) {

  //       })
  //     }
  //   }).render('#paypal-button-container');
  // }

  // nuovoOrdine: Ordine = {
  //   prezzo: 50.00,
  //   valuta: 'EUR',
  //   metodo: 'paypal',
  //   intent: 'sale',
  //   descrizione: 'Test'
  // }

  // createPayment(): void {
  //   this.paypalService.createPayment(this.nuovoOrdine).subscribe(response => {
  //     console.log(response); // response contains the PayPal payment information
  //     // render PayPal button with response.id
  //   });
  // }

  // executePayment(paymentId: string, payerId: string): void {
  //   this.paypalService.executePayment(paymentId, payerId).subscribe(response => {
  //     console.log(response); // response contains the PayPal payment execution information
  //     // display success or failure message to user
  //   });
  // }

  async creaBottoni() {
    try {
      paypal = await loadScript({ "client-id": "AUzDzdyp1Wsn4sSjPHQKGGjsDkRsdviLKX_mw-rnuU4_3oISrsgYNDIwA6MR5cw8FUvAsZSOSZRbJ_nJ" });
    } catch (error) {
      console.error("failed to load the PayPal JS SDK script", error);
    }

    if (paypal) {
      try {
        paypal.Buttons({
          createOrder: function(data: any, actions: any) {
            // Set up the transaction
            return actions.order.create({
              purchase_units: [{
                amount: {
                  value: '50.55',
                  // currency_code: 'EUR'
                }
              }]
            });
          }
        }).render('#paypal-button-container');
      } catch (error) {
        console.error("failed to render the PayPal Buttons", error);
      }
    }
  }

}
