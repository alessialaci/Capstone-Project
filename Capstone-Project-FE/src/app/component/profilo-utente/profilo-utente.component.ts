import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Utente } from 'src/app/models/utente.interface';
import { UtentiService } from 'src/app/services/utenti.service';

@Component({
  selector: 'app-profilo-utente',
  templateUrl: './profilo-utente.component.html',
  styleUrls: ['./profilo-utente.component.scss']
})
export class ProfiloUtenteComponent implements OnInit {

  utente: Utente | undefined;

  constructor(private us: UtentiService, private ar: ActivatedRoute) { }

  ngOnInit(): void {
    let id = this.ar.snapshot.params["id"];

    this.us.getUtenti().subscribe((utenti: Utente[]) => {
      this.utente = utenti.find((utenteTrovato) => {
        if (id == utenteTrovato.id) {
          return true;
        } else {
          return false;
        }
      })
    })
  }

}
