import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/auth/storage.service';
import { Foto } from 'src/app/models/foto.interface';
import { Notifica } from 'src/app/models/notifica.interface';
import { Opera } from 'src/app/models/opera.interface';
import { Utente } from 'src/app/models/utente.interface';
import { FotoService } from 'src/app/services/foto.service';
import { NotificheService } from 'src/app/services/notifiche.service';
import { UtentiService } from 'src/app/services/utenti.service';

@Component({
  selector: 'app-riepilogo',
  templateUrl: './riepilogo.component.html',
  styleUrls: ['./riepilogo.component.scss']
})
export class RiepilogoComponent implements OnInit {

  utente: Utente | undefined;
  admin: Utente | undefined;
  opera: Opera | undefined;
  confermato = false;
  listaFoto: Foto[] = [];

  constructor(private us: UtentiService, private ns: NotificheService, private ss: StorageService, private fs: FotoService) { }

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
    console.log("Dati inviati");
    this.confermato = true;
    this.ss.removeOperaSS();

    const nuovaNotifica: Partial<Notifica> = {
      utente: this.admin,
      opera: this.opera,
      messaggio: "L'utente " + this.utente?.nome + " " + this.utente?.cognome + "  ha inviato una richiesta di conferma per il lotto n. " + this.opera?.id
    };

    this.ns.addNotifica(nuovaNotifica).subscribe(notifica => {
      console.log("Notifica aggiunta correttamente", notifica);
    })
  }

}
