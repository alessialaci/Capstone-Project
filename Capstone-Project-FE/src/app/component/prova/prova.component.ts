import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OpereService } from 'src/app/services/opere.service';
import { TimerService } from 'src/app/services/timer.service';
import { Opera } from 'src/app/models/opera.interface';

@Component({
  selector: 'app-prova',
  templateUrl: './prova.component.html',
  styleUrls: ['./prova.component.scss']
})
export class ProvaComponent implements OnInit {

  giorni!: number;
  ore!: number;
  minuti!: number;
  secondi!: number
  timer!: number;
  listaOpere: Opera[] = [];

  constructor(private ts: TimerService, private os: OpereService) { }

  ngOnInit(): void {
    this.getLotti();
  }

  getLotti() {
    let oggi = new Date().getTime();

    this.os.getOpere().subscribe(opere => {
      this.listaOpere = opere.filter(opera => opera.statoLotto === "APPROVATO");
      console.log(this.listaOpere);

      for(let i = 0; i < this.listaOpere.length; i++) {
        console.log( new Date(this.listaOpere[i].scadenzaTimer).getTime() - oggi);

        this.startTimer(new Date(this.listaOpere[i].scadenzaTimer).getTime() - oggi);
        this.getTimer();
      }
    })
  }

  startTimer(tempo: number) {
    this.ts.startTimer(tempo);
  }

  getTimer() {
    this.ts.getTimer().subscribe(res => {
      this.giorni = Math.floor(res / 86400000);
      this.ore = Math.floor((res - (this.giorni * 86400000)) / 3600000);
      this.minuti = Math.floor((res - (this.giorni * 86400000) - (this.ore * 3600000)) / 60000);
      this.secondi = Math.floor((res - (this.giorni * 86400000) - (this.ore * 3600000) - (this.minuti * 60000)) / 1000);
    });
  }

}
