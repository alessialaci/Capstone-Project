import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Opera } from 'src/app/models/opera.interface';
import { Utente } from 'src/app/models/utente.interface';
import { UtentiService } from 'src/app/services/utenti.service';

@Component({
  selector: 'app-profilo-utente',
  templateUrl: './profilo-utente.component.html',
  styleUrls: ['./profilo-utente.component.scss']
})
export class ProfiloUtenteComponent implements OnInit {

  utente: any;
  preferiti: Opera[] | undefined;

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

  aggiornaUtente(form: NgForm) {
    const utenteAggiornato = {
      ...this.utente,
      foto: form.value.foto
    }

    console.log(form.value.foto);


    this.us.updateUtente(utenteAggiornato).subscribe((response) => {
      console.log('Utente aggiornato con successo', response);
    })
  }

}
