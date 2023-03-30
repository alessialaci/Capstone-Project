import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {

  currentStep: number = 1;

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Aggiorna il valore di currentStep in base alla pagina corrente
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        switch (event.urlAfterRedirects) {
          case '/aggiungi-lotto/dati':
            this.currentStep = 1;
            break;
          case '/aggiungi-lotto/foto':
            this.currentStep = 2;
            break;
          case '/aggiungi-lotto/valore':
            this.currentStep = 3;
            break;
          case '/aggiungi-lotto/spedizione':
            this.currentStep = 4;
            break;
          case '/aggiungi-lotto/riepilogo':
            this.currentStep = 5;
            break;
          default:
            this.currentStep = 1;
            break;
          }
        }
      });
    }

}
