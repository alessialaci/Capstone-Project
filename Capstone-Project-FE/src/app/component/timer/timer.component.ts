import { Component, Input, OnInit } from '@angular/core';
import { Opera } from 'src/app/models/opera.interface';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {

  // Per recuperare l'opera (viene inserita in dettagli-lotto html)
  @Input() opera: Opera | undefined;

  giorni!: number;
  ore!: number;
  minuti!: number;
  secondi!: number;

  constructor() { }

  ngOnInit(): void {
    // Per aggiornare il timer ogni secondo
    setInterval(() => {
      const timeLeft = this.opera?.scadenzaTimer ? this.getTimeRemaining(this.opera.scadenzaTimer) : { giorni: 0, ore: 0, minuti: 0, secondi: 0 };
      this.giorni = timeLeft.giorni;
      this.ore = timeLeft.ore;
      this.minuti = timeLeft.minuti;
      this.secondi = timeLeft.secondi;
    }, 1000);
  }

  // Per calcolare il tempo che rimane da quando è stato pubblicato il lotto (dopo 7 giorni)
  getTimeRemaining(endtime: Date): any {
    const total = Date.parse(endtime.toString()) - Date.parse(new Date().toString());
    const secondi = Math.floor((total / 1000) % 60);
    const minuti = Math.floor((total / 1000 / 60) % 60);
    const ore = Math.floor((total / (1000 * 60 * 60)) % 24);
    const giorni = Math.floor(total / (1000 * 60 * 60 * 24));
    return {
      total,
      giorni,
      ore,
      minuti,
      secondi
    };
  }

}