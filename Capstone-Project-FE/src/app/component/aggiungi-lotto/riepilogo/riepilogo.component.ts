import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/auth/storage.service';
import { Opera } from 'src/app/models/opera.interface';
import { Utente } from 'src/app/models/utente.interface';
import { UtentiService } from 'src/app/services/utenti.service';

@Component({
  selector: 'app-riepilogo',
  templateUrl: './riepilogo.component.html',
  styleUrls: ['./riepilogo.component.scss']
})
export class RiepilogoComponent implements OnInit {

  utente: Utente | undefined;
  opera: Opera | undefined;
  confermato = false;

  constructor(private us: UtentiService, private ss: StorageService) { }

  ngOnInit(): void {
    let utenteId = this.ss.getUser().id;

    this.us.getUtenteById(utenteId).subscribe(ut => {
      this.utente = ut;
    })

    this.opera = this.ss.getOpera();
  }

  inviaDati() {
    console.log("Dati inviati");
    this.confermato = true;
    this.ss.removeOperaSS();
  }

}
