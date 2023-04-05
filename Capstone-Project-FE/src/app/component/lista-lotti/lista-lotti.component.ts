import { Component, OnInit } from '@angular/core';
import { TipoOpera } from 'src/app/enums/tipo-opera.enum';
import { Notifica } from 'src/app/models/notifica.interface';
import { Offerta } from 'src/app/models/offerta.interface';
import { Opera } from 'src/app/models/opera.interface';
import { Ordine } from 'src/app/models/ordine.interface';
import { Utente } from 'src/app/models/utente.interface';
import { StorageService } from 'src/app/auth/storage.service';
import { NotificheService } from 'src/app/services/notifiche.service';
import { OfferteService } from 'src/app/services/offerte.service';
import { OpereService } from 'src/app/services/opere.service';
import { OrdiniService } from 'src/app/services/ordini.service';
import { UtentiService } from 'src/app/services/utenti.service';

@Component({
  selector: 'app-lista-lotti',
  templateUrl: './lista-lotti.component.html',
  styleUrls: ['./lista-lotti.component.scss']
})
export class ListaLottiComponent implements OnInit {

  utente: any;
  listaOpere: Opera[] = [];
  ultimaOfferta: Offerta | undefined;
  ordine: Partial<Ordine> | undefined;
  termineRicerca = '';
  paginaCorrente: number = 1;
  traUnOra = new Date(new Date().getTime() + 3600000);
  oggi = new Date();

  constructor(private us: UtentiService, private os: OpereService, private ofs: OfferteService, private ss: StorageService, private ns: NotificheService, private ors: OrdiniService) { }

  ngOnInit(): void {
    this.getLotti();

    const utenteId = this.ss.getUser().id;

    if (utenteId) {
      this.us.getUtenteById(utenteId).subscribe((utente: Utente) => {
        this.utente = utente;
      });
    }
  }

  // Per recuperare tutti i lotti con stato 'APPROVATO'
  getLotti() {
    this.os.getOpere().subscribe(opere => {
      this.listaOpere = opere.reverse().filter(opera => opera.statoLotto === "APPROVATO");
    })
  }

  // Per cercare le opere tramite titolo o autore
  cercaOpere() {
    if (!this.termineRicerca || this.termineRicerca.trim() === '') {
      this.getLotti();
    } else {
      this.listaOpere = this.listaOpere.filter(opera =>
        opera.titolo.toLowerCase().includes(this.termineRicerca.toLowerCase()) || opera.autore.nome.toLowerCase().includes(this.termineRicerca.toLowerCase()) || opera.autore.cognome.toLowerCase().includes(this.termineRicerca.toLowerCase())
      );
    }
  }

  // --- Per filtrare le opere in base alla categoria
  filtraDipinti() {
    this.os.getOpereByTipo(TipoOpera.DIPINTO).subscribe(dipinti => {
      this.listaOpere = dipinti.filter(dipinti => dipinti.statoLotto === 'APPROVATO');
    })
  }

  filtraDisegni() {
    this.os.getOpereByTipo(TipoOpera.DISEGNO).subscribe(disegni => {
      this.listaOpere = disegni.filter(disegni => disegni.statoLotto === 'APPROVATO');
    })
  }

  filtraFotografie() {
    this.os.getOpereByTipo(TipoOpera.FOTOGRAFIA).subscribe(foto => {
      this.listaOpere = foto.filter(foto => foto.statoLotto === 'APPROVATO');
    })
  }

  filtraSculture() {
    this.os.getOpereByTipo(TipoOpera.SCULTURA).subscribe(sculture => {
      this.listaOpere = sculture.filter(sculture => sculture.statoLotto === 'APPROVATO');
    })
  }

  filtraFumetti() {
    this.os.getOpereByTipo(TipoOpera.FUMETTO).subscribe(fumetti => {
      this.listaOpere = fumetti.filter(fumetti => fumetti.statoLotto === 'APPROVATO');
    })
  }
  // ---

  // Per recuperare i lotti in scadenza tra un'ora
  getLottiInScadenza() {
    this.os.getOpere().subscribe(opere => {
      this.listaOpere = opere.filter(opera => opera.statoLotto === "APPROVATO" && new Date(opera.scadenzaTimer) > this.oggi && new Date(opera.scadenzaTimer) < this.traUnOra);
    })
  }

  // Per aggiornare lo stato del lotto in 'SCADUTO' quando il countdown arriva a 0 e inviare la notifica all'utente
  timerScaduto(opera: Opera) {
    this.trovaUltimaOfferta(opera);

    this.os.updateOpera(opera, opera.id).subscribe(() => {
      const operaAggiornata = {
        ...opera,
        statoLotto: 'SCADUTO',
      };

      this.os.updateOpera(operaAggiornata, opera.id).subscribe(() => {
        this.invioNotifiche(opera);

        if(this.ultimaOfferta && this.ultimaOfferta.offerta > 1) {
          this.creaOrdine(opera);
        }

        this.getLotti();
      });
    });
  }

  // Per trovare l'ultima offerta legata all'opera passata
  trovaUltimaOfferta(opera: Opera) {
    this.ofs.getUltimaOfferta(opera).subscribe(offerta => {
      if(offerta) {
        this.ultimaOfferta = offerta;
      } else {
        this.ultimaOfferta = undefined;
      }
    });
  }

  // Per creare un ordine legato all'utente loggato
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
    })
  }

  // Per inviare le notifiche in base all'ultima offerta dell'opera passata
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

  // Per creare una notifica
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

  // Per convertire la data nel tipo Date
  convertiInDate(localDateTime: any): Date {
    return new Date(localDateTime);
  }

}
