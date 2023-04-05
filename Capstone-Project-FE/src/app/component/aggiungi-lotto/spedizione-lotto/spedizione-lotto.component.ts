import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/auth/storage.service';
import { OpereService } from 'src/app/services/opere.service';

@Component({
  selector: 'app-spedizione-lotto',
  templateUrl: './spedizione-lotto.component.html',
  styleUrls: ['./spedizione-lotto.component.scss']
})
export class SpedizioneLottoComponent implements OnInit {

  constructor(private ss: StorageService, private os: OpereService, private router: Router) { }

  ngOnInit(): void {
  }

  // Per aggiornare il lotto che si sta salvando con i dati della spedizione inseriti nel form
  aggiornaSpedizioneLotto(form: NgForm) {
    const operaSS = this.ss.getOpera();

    const operaAggiornata = {
      ...operaSS,
      altezza: form.value.altezza,
      lunghezza: form.value.lunghezza,
      larghezza: form.value.larghezza,
      peso: form.value.peso
    };

    this.os.updateOpera(operaAggiornata, operaSS.id).subscribe((response) => {
      console.log('Opera aggiornata con successo', response);
    });

    this.ss.saveOpera(operaAggiornata);

    this.router.navigate(['/aggiungi-lotto/riepilogo']);
  }

}
