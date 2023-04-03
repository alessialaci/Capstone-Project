import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { of, switchMap } from 'rxjs';
import { StorageService } from 'src/app/auth/storage.service';
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
  id!: number;
  utenteSS: any;
  files: File[] = [];
  modificaDati = false;
  preferiti: Opera[] | undefined;
  errore = '';
  mostraModifica = false;

  constructor(private us: UtentiService, private ss: StorageService, private fs: FotoService, private ar: ActivatedRoute, private loadingBar: LoadingBarService) { }

  ngOnInit(): void {
    this.getUtente();
    this.checkUtente();
  }

  getUtente() {
    this.utenteSS = this.ss.getUser();

    this.id = this.ar.snapshot.params["id"];
    console.log(this.id);


    this.us.getUtenti().subscribe((utenti: Utente[]) => {
      this.utente = utenti.find((utenteTrovato) => {
        if (this.id == utenteTrovato.id) {
          return true;
        } else {
          return false;
        }
      })
    })
  }

  checkUtente() {
    this.utenteSS = this.ss.getUser();
    let id = this.ar.snapshot.params["id"];

    if(this.utenteSS.id == id) {
      this.mostraModifica = true;
    } else {
      this.mostraModifica = false;
    }

  }

  onSelect(event: any) {
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
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

    this.loadingBar.start();

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
      this.loadingBar.complete();
    });
  }

  aggiornaDatiUtente(form: NgForm) {
    const utenteAggiornato = {
      ...this.utente,
      nome: form.value.nome,
      cognome: form.value.cognome,
      username: form.value.username,
      password: form.value.password,
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

  modifica() {
    this.modificaDati = true;
  }

  annulla() {
    this.modificaDati = false;
  }

}
