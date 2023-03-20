import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CondizioniOpera } from 'src/app/enums/condizioni-opera.enum';
import { TecnicaOpera } from 'src/app/enums/tecnica-opera.enum';
import { TipoOpera } from 'src/app/enums/tipo-opera.enum';
import { Opera } from 'src/app/models/opera.interface';
import { Utente } from 'src/app/models/utente.interface';
import { OpereService } from 'src/app/services/opere.service';
import { UtentiService } from 'src/app/services/utenti.service';
import { StorageService } from 'src/app/auth/storage.service';

@Component({
  selector: 'app-dati-lotto',
  templateUrl: './dati-lotto.component.html',
  styleUrls: ['./dati-lotto.component.scss']
})
export class DatiLottoComponent implements OnInit {

  utente: Utente | undefined;
  tipiLotto = Object.values(TipoOpera);
  tecnicheOpera = Object.values(TecnicaOpera);
  condizioniOpera = Object.values(CondizioniOpera);
  tipoSelezionato: TipoOpera | undefined;
  tecnicaSelezionata: TecnicaOpera | undefined;
  condizioniSelezionate: CondizioniOpera | undefined;

  constructor(private ss: StorageService, private os: OpereService, private router: Router) {}

  ngOnInit(): void {
    this.utente = this.ss.getUser();
  }

  aggiungiDatiLotto(form: NgForm) {
    const nuovaOpera: Partial<Opera> = {
      autore: this.utente,
      tipo: this.tipoSelezionato,
      titolo: form.value.titolo,
      descrizione: form.value.descrizione,
      anno: form.value.anno,
      tecnica: this.tecnicaSelezionata,
      condizioni: this.condizioniSelezionate
    };

    this.os.addOpera(nuovaOpera).subscribe(
      response => {
        console.log('Opera aggiunta con successo', response);
      }
    );

    this.router.navigate(['/aggiungi-lotto/foto']);
  }

}
