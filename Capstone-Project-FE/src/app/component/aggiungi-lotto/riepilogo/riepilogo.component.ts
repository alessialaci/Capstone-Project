import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/auth/storage.service';
import { Foto } from 'src/app/models/foto.interface';
import { Notifica } from 'src/app/models/notifica.interface';
import { Opera } from 'src/app/models/opera.interface';
import { Utente } from 'src/app/models/utente.interface';
import { FotoService } from 'src/app/services/foto.service';
import { NotificheService } from 'src/app/services/notifiche.service';
import { UtentiService } from 'src/app/services/utenti.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-riepilogo',
  templateUrl: './riepilogo.component.html',
  styleUrls: ['./riepilogo.component.scss']
})
export class RiepilogoComponent implements OnInit {

  utente: Utente | undefined;
  admin: Utente | undefined;
  opera: Opera | undefined;
  listaFoto: Foto[] = [];

  constructor(private us: UtentiService, private ns: NotificheService, private ss: StorageService, private fs: FotoService, private router: Router) { }

  ngOnInit(): void {
    let utenteId = this.ss.getUser().id;

    this.us.getUtenteById(utenteId).subscribe(ut => {
      this.utente = ut;
    })

    this.opera = this.ss.getOpera();

    // Recupero l'admin
    this.us.getUtenteById(1).subscribe(admin => {
      this.admin = admin;
    })
  }

  inviaDati() {
    this.ss.removeOperaSS();

    const nuovaNotifica: Partial<Notifica> = {
      utente: this.admin,
      opera: this.opera,
      messaggio: "L'utente " + this.utente?.nome + " " + this.utente?.cognome + "  ha inviato una richiesta di conferma per il lotto n. " + this.opera?.id
    };

    this.ns.addNotifica(nuovaNotifica).subscribe(notifica => {
      Swal.fire({
        icon: 'success',
        title: 'Grazie!',
        text: 'Dati inviati con successo! Un esperto controllerà la tua opera prima di pubblicarla sul sito.',
      });
      this.router.navigate(['/lista-lotti']);
    })
  }

}
