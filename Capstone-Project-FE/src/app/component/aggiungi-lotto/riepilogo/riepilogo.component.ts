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

  constructor(private us: UtentiService, private ss: StorageService) { }

  ngOnInit(): void {
    let u = this.ss.getUser();

    this.us.getUtenti().subscribe((utenti: Utente[]) => {
      this.utente = utenti.find((utenteTrovato) => {
        if (u.id == utenteTrovato.id) {
          return true;
        } else {
          return false;
        }
      })
    })

    this.opera = this.ss.getOpera();
  }

  inviaDati() {
    console.log("Dati inviati");
    // Dovrebbe inviare i dati all'admin che deve accettarli e caricarli sul sito
    // Se riesco a farlo biogna inserire all'opera un boolean in modo tale che carica sul sito solo quelli accettati (true)
  }

}
