import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { Opera } from 'src/app/models/opera.interface';
import { Utente } from 'src/app/models/utente.interface';
import { FotoService } from 'src/app/services/foto.service';
import { UtentiService } from 'src/app/services/utenti.service';

@Component({
  selector: 'app-profilo-utente',
  templateUrl: './profilo-utente.component.html',
  styleUrls: ['./profilo-utente.component.scss']
})
export class ProfiloUtenteComponent implements OnInit {

  utente: Utente | undefined;
  files: File[] = [];
  modificaDati = false;
  preferiti: Opera[] | undefined;
  errore = '';

  constructor(private us: UtentiService, private fs: FotoService, private ar: ActivatedRoute) { }

  ngOnInit(): void {
    this.getUtente();
  }

  getUtente() {
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

  onSelect(event: any) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  aggiornaFotoUtente() {
    if(this.files.length < 1) {
      this.errore = 'Non hai inserito nessuna foto';
      return;
    }

    if(this.files.length > 1) {
      this.errore = 'Non è possibile inserire più di una foto';
      return;
    }

    const data = new FormData();
    data.append('file', this.files[0]);
    data.append('upload_preset', 'artia_cloudinary2');
    data.append('cloud_name', 'dwe3fc2iq');

    this.fs.uploadImage(data).pipe(
      // switchMap serve a fare in modo che l'aggiornamento dell'utente avvenga solo dopo che l'immagine è stata caricata con successo
      switchMap(response => {
        if (response) {
          let url = response.secure_url;

          const utenteAggiornato = {
            ...this.utente,
            foto: url
          };

          return this.us.updateUtente(utenteAggiornato);
        } else {
          return of(null);
        }
      })
    ).subscribe((response) => {
      this.getUtente();
      this.modificaDati = false;
    });
  }

  aggiornaDatiUtente(form: NgForm) {
    const utenteAggiornato = {
      ...this.utente,
      nome: form.value.nome,
      cognome: form.value.cognome,
      username: form.value.username,
      bio: form.value.bio,
      via: form.value.via,
      cap: form.value.cap,
      citta: form.value.citta,
      stato: form.value.stato
    }

    this.us.updateUtente(utenteAggiornato).subscribe(res => {
      console.log("Utente aggiornato correttamente", res);
    });
  }

  /*aggiornaDatiLotto(form: NgForm) {
    const operaSS = this.ss.getOpera();

    const operaAggiornata = {
      ...operaSS,
      altezza: form.value.altezza,
      lunghezza: form.value.lunghezza,
      larghezza: form.value.larghezza,
      peso: form.value.peso
    };

    this.os.updateOpera(operaAggiornata, operaSS.id).subscribe((response) => {
      console.log('Opera aggiornata con successo', response);
    });

    this.ss.saveOpera(operaAggiornata);

    this.router.navigate(['/aggiungi-lotto/riepilogo']);
  } */

  modifica() {
    this.modificaDati = true;
  }

  annulla() {
    this.modificaDati = false;
  }

}
