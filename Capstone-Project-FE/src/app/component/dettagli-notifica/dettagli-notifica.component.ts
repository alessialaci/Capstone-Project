import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { StorageService } from 'src/app/auth/storage.service';
import { Foto } from 'src/app/models/foto.interface';
import { Notifica } from 'src/app/models/notifica.interface';
import { Opera } from 'src/app/models/opera.interface';
import { Utente } from 'src/app/models/utente.interface';
import { FotoService } from 'src/app/services/foto.service';
import { NotificheService } from 'src/app/services/notifiche.service';
import { OpereService } from 'src/app/services/opere.service';
import { UtentiService } from 'src/app/services/utenti.service';

@Component({
  selector: 'app-dettagli-notifica',
  templateUrl: './dettagli-notifica.component.html',
  styleUrls: ['./dettagli-notifica.component.scss']
})
export class DettagliNotificaComponent implements OnInit {

  notifica: Notifica | undefined;
  utenteSS: any;
  utente: Utente | undefined;
  utenteId!: number;
  listaFoto: Foto[] = [];
  isAdmin = false;
  giudicato = false;
  routeSub!: Subscription;

  constructor(private ar: ActivatedRoute, private ns: NotificheService, private ss: StorageService, private us: UtentiService, private os: OpereService, private fs: FotoService) { }

  ngOnInit(): void {
    this.routeSub = this.ar.params.subscribe(params => {
      const id = +params['id'];
      this.getNotifica(id);

      this.utenteSS = this.ss.getUser();
      this.utenteId = this.utenteSS.id;

      this.us.getUtenteById(this.utenteId).subscribe(ut => {
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

  confermaLotto(opera: Opera, notifica: Notifica) {
    const oggi = new Date();
    this.os.getOperaById(opera.id).subscribe(opera => {
      // scadenzaTimer: new Date(oggi.getTime() + 7 * 24 * 60 * 60 * 1000)
      const operaAggiornata = {
        ...opera,
        statoLotto: 'APPROVATO',
        scadenzaTimer: new Date(oggi.getTime() + (120 * 60 * 1000) + (20 * 60 * 1000)).toISOString()
      };

      this.os.updateOpera(operaAggiornata, opera.id).subscribe(() => {
        console.log('Lotto confermato');
        this.giudicato = true;
        this.creaNotifica(opera, "Il tuo lotto è stato confermato");
      });
    });
  }

  rifiutaLotto(opera: Opera, notifica: Notifica) {
    this.os.getOperaById(opera.id).subscribe(opera => {
      const operaAggiornata = { ...opera, statoLotto: 'RIFIUTATO' };
      this.os.updateOpera(operaAggiornata, opera.id).subscribe(() => {
        console.log('Lotto rifiutato');
        this.giudicato = true;
        this.creaNotifica(opera, "Il tuo lotto è stato rifiutato");
      });
    });
  }

  creaNotifica(opera: Opera, messaggio: string) {
    const nuovaNotifica: Partial<Notifica> = {
      utente: opera.autore,
      opera: opera,
      messaggio: messaggio
    };

    this.ns.addNotifica(nuovaNotifica).subscribe(notifica => {
      console.log("Notifica aggiunta correttamente", notifica);
    })
  }

}
