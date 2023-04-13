import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Utente } from 'src/app/models/utente.interface';
import { Foto } from 'src/app/models/foto.interface';
import { Notifica } from 'src/app/models/notifica.interface';
import { Opera } from 'src/app/models/opera.interface';
import { StorageService } from 'src/app/auth/storage.service';
import { FotoService } from 'src/app/services/foto.service';
import { NotificheService } from 'src/app/services/notifiche.service';
import { OpereService } from 'src/app/services/opere.service';
import { UtentiService } from 'src/app/services/utenti.service';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-dettagli-notifica',
  templateUrl: './dettagli-notifica.component.html',
  styleUrls: ['./dettagli-notifica.component.scss']
})
export class DettagliNotificaComponent implements OnInit {

  utenteSS: any;
  utente: Utente | undefined;
  id!: number;
  notifica: Notifica | undefined;
  listaFoto: Foto[] = [];
  isAdmin = false;
  routeSub!: Subscription;

  constructor(private ar: ActivatedRoute, private ns: NotificheService, private ss: StorageService, private us: UtentiService, private os: OpereService, private fs: FotoService) { }

  ngOnInit(): void {
    this.routeSub = this.ar.params.subscribe(params => {
      this.id = +params['id'];
      this.getNotifica(this.id);

      this.utenteSS = this.ss.getUser();

      this.us.getUtenteById(this.utenteSS.id).subscribe(ut => {
        this.utente = ut;

        if(this.utenteSS) {
          if(this.utenteSS.roles[0] == 'ROLE_ADMIN') {
            this.isAdmin = true;
          } else if(this.utenteSS.roles[0] == 'ROLE_USER') {
            this.isAdmin = false;
          }
        }
      });
    });
  }

  // Per recuperare la notifica dall'id passato
  getNotifica(id: number) {
    this.ns.getNotificaById(id).subscribe(not => {
      this.notifica = not;
      this.trovaFoto(not.opera);
    })
  }

  // Per recuperare tutte le immagini legate all'opera presa in considerazione
  trovaFoto(opera: Opera) {
    this.fs.getFotoByOperaId(opera).subscribe(foto => {
      this.listaFoto = foto;
    });
  }

  // Per aggiornare lo stato del lotto in 'APPROVATO', far partire il timer di 7 giorni e inviare la notifica all'autore dell'opera
  confermaLotto(opera: Opera, form: NgForm) {
    const oggi = new Date();

    // Scadenza a 7 giorni --> scadenzaTimer: new Date(oggi.getTime() + 7 * 24 * 60 * 60 * 1000)
    const operaAggiornata = {
      ...opera,
      statoLotto: 'APPROVATO',
      scadenzaTimer: new Date(oggi.getTime() + (1 * 60 * 1000) + (120 * 60 * 1000)).toISOString() // Scadenza ad 1 minuto per presenzione
    };

    this.os.updateOpera(operaAggiornata, opera.id).subscribe(() => {
      this.creaNotifica(opera, "Il tuo lotto n. " + opera.id + " è stato confermato!", form.value.messaggioAdmin);
      this.getNotifica(this.id);
      Swal.fire({
        icon: 'success',
        title: 'Lotto Approvato!',
        text: 'Notifica inviata all\'autore del lotto.',
      });
    });
  }

  // Per aggiornare lo stato del lotto in 'RIFIUTATO' e inviare la notifica all'autore dell'opera
  rifiutaLotto(opera: Opera, form: NgForm) {
    const operaAggiornata = {
      ...opera,
      statoLotto: 'RIFIUTATO'
    };

    this.os.updateOpera(operaAggiornata, opera.id).subscribe(() => {
      this.creaNotifica(opera, "Il tuo lotto n. " + opera.id + " è stato rifiutato", form.value.messaggioAdmin);
      this.getNotifica(this.id);
      Swal.fire({
        icon: 'warning',
        title: 'Lotto Rifiutato',
        text: 'Notifica inviata all\'autore del lotto.',
      });
    });
  }

  // Per creare la notifica
  creaNotifica(opera: Opera, messaggio: string, messaggioAdmin: string) {
    const nuovaNotifica: Partial<Notifica> = {
      utente: opera.autore,
      opera: opera,
      messaggio: messaggio,
      messaggioAdmin: messaggioAdmin
    };

    this.ns.addNotifica(nuovaNotifica).subscribe(notifica => {
      console.log("Notifica aggiunta correttamente", notifica);
    })
  }

}
