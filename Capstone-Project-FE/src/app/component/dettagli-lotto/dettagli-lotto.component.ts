import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FotoService } from 'src/app/services/foto.service';
import { NotificheService } from 'src/app/services/notifiche.service';
import { OrdiniService } from 'src/app/services/ordini.service';
import { StorageService } from '../../auth/storage.service';
import { OfferteService } from '../../services/offerte.service';
import { OpereService } from '../../services/opere.service';
import { UtentiService } from '../../services/utenti.service';
import { PreferitiService } from 'src/app/services/preferiti.service';
import { Notifica } from 'src/app/models/notifica.interface';
import { Ordine } from 'src/app/models/ordine.interface';
import { Foto } from 'src/app/models/foto.interface';
import { Offerta } from '../../models/offerta.interface';
import { Opera } from '../../models/opera.interface';
import { Utente } from '../../models/utente.interface';
import { Preferito } from 'src/app/models/preferito.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dettagli-lotto',
  templateUrl: './dettagli-lotto.component.html',
  styleUrls: ['./dettagli-lotto.component.scss']
})
export class DettagliLottoComponent implements OnInit {

  utente: any;
  idOpera!: number;
  opera: Opera | undefined;
  ultimaOfferta: Offerta | undefined;
  ordine: Partial<Ordine> | undefined;
  listaOfferte: Offerta[] = [];
  listaFoto: Foto[] = [];
  listaPreferiti: any;
  errore = "";

  swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-warning rounded-0 mx-2',
      cancelButton: 'btn btn-annulla rounded-0 mx-2'
    },
    buttonsStyling: false
  })

  constructor(private us: UtentiService, private os: OpereService, private ofs: OfferteService, private fs: FotoService, private ss: StorageService, private ar: ActivatedRoute, private ns: NotificheService, private ors: OrdiniService, private router: Router, private ps: PreferitiService) { }

  ngOnInit(): void {
    this.idOpera = this.ar.snapshot.params["id"];

    this.os.getOperaById(this.idOpera).subscribe(o => {
      this.opera = o;

      this.trovaFoto(o);
      this.trovaOfferte(o);
    });

    const utenteId = this.ss.getUser().id;

    if (utenteId) {
      this.us.getUtenteById(utenteId).subscribe((utente: Utente) => {
        this.utente = utente;

        const fakeEvent = {
          target: document.querySelector('.btn.icona')
        };
        this.controllaPreferito(fakeEvent);
      });
    }
  }

  // Per recuperare tutte le immagini legate all'opera presa in considerazione
  trovaFoto(opera: Opera) {
    this.fs.getFotoByOperaId(opera).subscribe(foto => {
      this.listaFoto = foto;
    });
  }

  // Per recuperare tutte le offerte legate all'opera presa in considerazione
  trovaOfferte(opera: Opera) {
    this.ofs.getOfferteByOperaId(opera).subscribe(offerte => {
      this.listaOfferte = offerte.reverse();
      console.log("offerte", offerte);
    });

    this.trovaUltimaOfferta(opera);
  }

  // Per recuperare l'ultima offerta legata all'opera presa in considerazione
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

  confermaOfferta(form: NgForm) {
    this.swalWithBootstrapButtons.fire({
      title: 'Sei sicuro?',
      text: `Confermi l'offerta di €${form.value.offerta}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Conferma',
      cancelButtonText: 'Annulla',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        if (!this.ss.isLoggedIn()) {
          this.router.navigate(['/login']);
          return;
        }

        if (this.opera!.autore && this.opera!.autore.id === this.utente?.id) {
          this.errore = "Non puoi fare un'offerta per una tua opera";
          return;
        }

        if (this.opera!.timer && this.opera!.timer.giorni <= 0 && this.opera!.timer.ore <= 0 && this.opera!.timer.minuti <= 0 && this.opera!.timer.secondi <= 0) {
          this.errore = 'Il timer è scaduto! Non è più possibile fare offerte per questo lotto';
          return;
        }

        if ((this.ultimaOfferta !== undefined && form.value.offerta < this.ultimaOfferta.offerta) || (this.ultimaOfferta === undefined && form.value.offerta <= 1)) {
          this.errore = "Non puoi fare un'offerta minore della precedente di €" + (this.ultimaOfferta?.offerta ? this.ultimaOfferta.offerta : 1);
          return;
        }

        if ((this.ultimaOfferta === undefined && form.value.offerta > 1) || (this.ultimaOfferta!.offerta !== undefined && form.value.offerta > this.ultimaOfferta!.offerta)) {
          const nuovaOfferta: Partial<Offerta> = {
            data: new Date(),
            opera: this.opera,
            utente: this.utente,
            offerta: form.value.offerta
          };

          this.ofs.addOfferta(nuovaOfferta).subscribe((response) => {
            console.log('Offerta aggiunta con successo', response);

            if(this.ultimaOfferta) {
              this.creaNotifica(this.ultimaOfferta.utente, this.opera!, "L'utente " + this.utente!.nome + " ha fatto un'offerta di €" + form.value.offerta)
            }

            this.swalWithBootstrapButtons.fire(
              'Offerta confermata!',
              '',
              'success'
            )

            this.trovaOfferte(this.opera!);
          });
        } else {
          this.errore = "L'offerta non può essere uguale o inferiore alla precedente di €" + this.ultimaOfferta?.offerta;
          return;
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.swalWithBootstrapButtons.fire(
          'Offerta annullata!',
          '',
          'error'
        )
      }
    })
  }

  aggiungiAiPreferiti(event: any) {
    this.ps.getPreferitiByUtenteId(this.utente.id).subscribe(preferiti => {
      this.listaPreferiti = preferiti;

      if(preferiti.find(preferito => preferito.opera.id == this.opera?.id && preferito.utente.id == this.utente.id)) {
        preferiti.find(preferito => this.ps.getPreferitoById(preferito.id).subscribe(preferito => {
          event.target.classList.remove('icona-like');
          event.target.classList.add('icona');

          this.ps.deletePreferito(preferito.id).subscribe(res => {
            console.log("cancellato", res);

          });
        }));
      } else {
        event.target.classList.remove('icona');
        event.target.classList.add('icona-like');

        const nuovoPreferito: Partial<Preferito> = {
          utente: this.utente,
          opera: this.opera
        };

        this.ps.addPreferito(nuovoPreferito).subscribe((preferito) => {
          console.log('Preferito aggiunta correttamente', preferito);
        });
      }
    })
  }

  controllaPreferito(event: any) {
    this.ps.getPreferitiByUtenteId(this.utente.id).subscribe(preferiti => {
      this.listaPreferiti = preferiti;

      if(preferiti.find(preferito => preferito.opera.id == this.opera?.id && preferito.utente.id == this.utente.id)) {
        event.target.classList.remove('icona');
        event.target.classList.add('icona-like');
      } else {
        event.target.classList.remove('icona-like');
        event.target.classList.add('icona');
      }
    })
  }

  // Per aggiornare lo stato del lotto in 'SCADUTO' quando il countdown arriva a 0 e inviare la notifica all'utente
  timerScaduto(opera: Opera) {
    this.os.updateOpera(opera, opera.id).subscribe(() => {
      const operaAggiornata = {
        ...opera,
        statoLotto: 'SCADUTO',
      };

      this.os.updateOpera(operaAggiornata, opera.id).subscribe(() => {
        console.log('Lotto scaduto');
        this.invioNotifiche(opera);

        if(this.ultimaOfferta && this.ultimaOfferta.offerta > 1) {
          this.creaOrdine();
        }
      });
    });
  }

  // Per creare un ordine legato all'utente nel session storage
  creaOrdine() {
    let prezzo = this.ultimaOfferta?.offerta;
    let speseTrasporto = 10.00;
    let commissione = (this.ultimaOfferta!.offerta * 8) / 100;
    let totale = Number(prezzo) + Number(speseTrasporto) + Number(commissione);

    const nuovoOrdine: Partial<Ordine> = {
      opera: this.opera,
      compratore: this.utente,
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

  // Per inviare le notifiche in base alla situazione
  invioNotifiche(opera: Opera) {
    if (this.ultimaOfferta == undefined || this.ultimaOfferta.offerta <= 1) {
      this.creaNotifica(opera.autore, opera, 'Ci dispiace, ma non hai ricevuto offerte per la tua opera');
    } else if(this.ultimaOfferta.offerta < this.opera!.prezzoMinimo) {
      this.creaNotifica(opera.autore, opera, 'Ci dispiace, ma le offerte effettuate dagli utenti non hanno raggiunto il prezzo minimo da te inserito. L\'asta è annullata');
    } else {
      this.creaNotifica(opera.autore, opera, 'Asta terminata! Il tuo lotto è stato venduto all\'utente ' + this.ultimaOfferta.utente.nome + ' ' + this.ultimaOfferta.utente.cognome + ' al prezzo di €' + this.ultimaOfferta.offerta + '. Il pacco deve essere spedito in: ' + this.ultimaOfferta.utente.via + ' - ' + this.ultimaOfferta.utente.cap + ' - ' + this.ultimaOfferta.utente.citta + ' ' + this.ultimaOfferta.utente.stato);
      this.creaNotifica(this.ultimaOfferta.utente, opera, 'Complimenti! Ti sei aggiudicato l\'asta del lotto n. ' + this.opera!.id + ". Per poter ricevere la tua opera il prima possibile, ti preghiamo di completare l'ultimo passaggio nella sezione 'Ordini'.")
    }
  }

}
