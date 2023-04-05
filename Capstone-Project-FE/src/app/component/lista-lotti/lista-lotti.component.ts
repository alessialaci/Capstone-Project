import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/auth/storage.service';
import { TipoOpera } from 'src/app/enums/tipo-opera.enum';
import { Notifica } from 'src/app/models/notifica.interface';
import { Offerta } from 'src/app/models/offerta.interface';
import { Opera } from 'src/app/models/opera.interface';
import { Ordine } from 'src/app/models/ordine.interface';
import { Utente } from 'src/app/models/utente.interface';
import { FotoService } from 'src/app/services/foto.service';
import { NotificheService } from 'src/app/services/notifiche.service';
import { OfferteService } from 'src/app/services/offerte.service';
import { OpereService } from 'src/app/services/opere.service';
import { OrdiniService } from 'src/app/services/ordini.service';
import { PreferitiService } from 'src/app/services/preferiti.service';
import { UtentiService } from 'src/app/services/utenti.service';

@Component({
  selector: 'app-lista-lotti',
  templateUrl: './lista-lotti.component.html',
  styleUrls: ['./lista-lotti.component.scss']
})
export class ListaLottiComponent implements OnInit {

  listaOpere: Opera[] = [];
  termineRicerca = '';
  paginaCorrente: number = 1;
  traUnOra = new Date(new Date().getTime() + 3600000);
  oggi = new Date();

  utente: any;
  idOpera!: number;
  opera: Opera | undefined;
  ultimaOfferta: Offerta | undefined;
  ordine: Partial<Ordine> | undefined;
  listaOfferte: Offerta[] = [];

  constructor(private us: UtentiService, private os: OpereService, private ofs: OfferteService, private fs: FotoService, private ss: StorageService, private ar: ActivatedRoute, private ns: NotificheService, private ors: OrdiniService, private router: Router, private ps: PreferitiService) { }

  ngOnInit(): void {
    this.getLotti();

    const utenteId = this.ss.getUser().id;

    if (utenteId) {
      this.us.getUtenteById(utenteId).subscribe((utente: Utente) => {
        this.utente = utente;
      });
    }
  }

  convertiLocalDateTimeInDate(localDateTime: any): Date {
    return new Date(localDateTime);
  }

  getLotti() {
    this.os.getOpere().subscribe(opere => {
      this.listaOpere = opere.reverse().filter(opera => opera.statoLotto === "APPROVATO");
    })
  }

  getLottiInScadenza() {
    this.os.getOpere().subscribe(opere => {
      this.listaOpere = opere.filter(opera => opera.statoLotto === "APPROVATO" && new Date(opera.scadenzaTimer) > this.oggi && new Date(opera.scadenzaTimer) < this.traUnOra);
    })
  }

  filtrareOpere() {
    if (!this.termineRicerca || this.termineRicerca.trim() === '') {
      this.getLotti();
    } else {
      this.listaOpere = this.listaOpere.filter(opera =>
        opera.titolo.toLowerCase().includes(this.termineRicerca.toLowerCase()) || opera.autore.nome.toLowerCase().includes(this.termineRicerca.toLowerCase()) || opera.autore.cognome.toLowerCase().includes(this.termineRicerca.toLowerCase())
      );
    }
  }

  cercaDipinti() {
    this.os.getOpereByTipo(TipoOpera.DIPINTO).subscribe(dipinti => {
      this.listaOpere = dipinti.filter(dipinti => dipinti.statoLotto === 'APPROVATO');
    })
  }

  cercaDisegni() {
    this.os.getOpereByTipo(TipoOpera.DISEGNO).subscribe(disegni => {
      this.listaOpere = disegni.filter(disegni => disegni.statoLotto === 'APPROVATO');
    })
  }

  cercaFotografie() {
    this.os.getOpereByTipo(TipoOpera.FOTOGRAFIA).subscribe(foto => {
      this.listaOpere = foto.filter(foto => foto.statoLotto === 'APPROVATO');
    })
  }

  cercaSculture() {
    this.os.getOpereByTipo(TipoOpera.SCULTURA).subscribe(sculture => {
      this.listaOpere = sculture.filter(sculture => sculture.statoLotto === 'APPROVATO');
    })
  }

  cercaFumetti() {
    this.os.getOpereByTipo(TipoOpera.FUMETTO).subscribe(fumetti => {
      this.listaOpere = fumetti.filter(fumetti => fumetti.statoLotto === 'APPROVATO');
    })
  }

  //--------------------------------------------------------------

  trovaOfferte(opera: Opera) {
    this.ofs.getOfferteByOperaId(opera).subscribe(offerte => {
      this.listaOfferte = offerte.reverse();
      console.log("offerte", offerte);
    });

    this.trovaUltimaOfferta(opera);
  }

  trovaUltimaOfferta(opera: Opera) {
    this.ofs.getUltimaOfferta(opera).subscribe(offerta => {
      if(offerta) {
        this.ultimaOfferta = offerta;
      } else {
        this.ultimaOfferta = undefined;
      }
      console.log("ultima offerta", this.ultimaOfferta);
    });
  }

  timerScaduto(opera: Opera) {
    this.trovaUltimaOfferta(opera);

    this.os.updateOpera(opera, opera.id).subscribe(() => {
      const operaAggiornata = {
        ...opera,
        statoLotto: 'SCADUTO',
      };

      this.os.updateOpera(operaAggiornata, opera.id).subscribe(() => {
        console.log('Lotto scaduto');

        this.invioNotifiche(opera);

        if(this.ultimaOfferta && this.ultimaOfferta.offerta > 1) {
          this.creaOrdine(opera);
        }

        this.getLotti();
      });
    });
  }

  creaOrdine(opera: Opera) {
    let prezzo = this.ultimaOfferta?.offerta;
    let speseTrasporto = 10.00;
    let commissione = (this.ultimaOfferta!.offerta * 8) / 100;
    let totale = Number(prezzo) + Number(speseTrasporto) + Number(commissione);

    const nuovoOrdine: Partial<Ordine> = {
      opera: opera,
      compratore: this.ultimaOfferta?.utente,
      valuta: 'EUR',
      prezzo: prezzo,
      speseTrasporto: speseTrasporto,
      commissione: commissione,
      totale: totale
    };

    this.ors.addOrdine(nuovoOrdine).subscribe(ordine => {
      this.ordine = ordine;
      console.log(ordine);
    })
  }

  creaNotifica(destinatario: Utente, opera: Opera, messaggio: string) {
    const nuovaNotifica: Partial<Notifica> = {
      utente: destinatario,
      opera: opera,
      messaggio: messaggio,
    };

    this.ns.addNotifica(nuovaNotifica).subscribe((notifica) => {
      console.log('Notifica aggiunta correttamente', notifica);
    });
  }

  invioNotifiche(opera: Opera) {
    if (this.ultimaOfferta == undefined || this.ultimaOfferta.offerta <= 1) {
      this.creaNotifica(opera.autore, opera, 'Ci dispiace, ma non hai ricevuto offerte per la tua opera');
    } else if(this.ultimaOfferta.offerta < opera.prezzoMinimo) {
      this.creaNotifica(opera.autore, opera, 'Ci dispiace, ma le offerte effettuate dagli utenti non hanno raggiunto il prezzo minimo da te inserito. L\'asta è annullata');
    } else {
      this.creaNotifica(opera.autore, opera, 'Asta terminata! Il tuo lotto è stato venduto all\'utente ' + this.ultimaOfferta.utente.nome + ' ' + this.ultimaOfferta.utente.cognome + ' al prezzo di €' + this.ultimaOfferta.offerta + '. Il pacco deve essere spedito in: ' + this.ultimaOfferta.utente.via + ' - ' + this.ultimaOfferta.utente.cap + ' - ' + this.ultimaOfferta.utente.citta + ' ' + this.ultimaOfferta.utente.stato);
      this.creaNotifica(this.ultimaOfferta.utente, opera, 'Complimenti! Ti sei aggiudicato l\'asta del lotto n. ' + opera.id + ". Per poter ricevere la tua opera il prima possibile, ti preghiamo di completare l'ultimo passaggio nella sezione 'Ordini'.")
    }
  }

}
