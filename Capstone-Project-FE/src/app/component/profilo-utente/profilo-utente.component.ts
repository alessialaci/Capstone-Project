import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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

  utente: any;
  files: File[] = [];
  preferiti: Opera[] | undefined;
  fotoUtente = '';

  constructor(private us: UtentiService, private fs: FotoService, private ar: ActivatedRoute) { }

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

  onSelect(event: any) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  aggiornaUtente() {
    const data = new FormData();
    data.append('file', this.files[0]);
    data.append('upload_preset', 'artia_cloudinary2');
    data.append('cloud_name', 'dwe3fc2iq');

    this.fs.uploadImage(data).subscribe(response => {
      if (response) {
        this.fotoUtente = response;


      }
    });

    this.aggiornaFoto(this.fotoUtente);
  }

  aggiornaFoto(url: string) {
    console.log("foto", url);
    const utenteAggiornato = {
      ...this.utente,
      foto: url
    }

    this.us.updateUtente(utenteAggiornato).subscribe((response) => {
      console.log('Utente aggiornato con successo', response);
    })
  }

}
