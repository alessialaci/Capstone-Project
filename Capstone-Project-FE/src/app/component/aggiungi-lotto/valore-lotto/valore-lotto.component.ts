import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/auth/storage.service';
import { OpereService } from 'src/app/services/opere.service';

@Component({
  selector: 'app-valore-lotto',
  templateUrl: './valore-lotto.component.html',
  styleUrls: ['./valore-lotto.component.scss']
})
export class ValoreLottoComponent implements OnInit {

  constructor(private ss: StorageService, private os: OpereService, private router: Router) { }

  ngOnInit(): void {
  }

  aggiornaDatiLotto(form: NgForm) {
    const operaSS = this.ss.getOpera();

    const operaAggiornata = {
      ...operaSS,
      stimaPrezzo: Number.parseFloat(form.value.stimaPrezzo),
      prezzoMinimo: form.value.minimo
    };

    this.os.updateOpera(operaAggiornata, operaSS.id).subscribe((response) => {
      console.log('Opera aggiornata con successo', response);
    });

    this.ss.saveOpera(operaAggiornata);

    this.router.navigate(['/aggiungi-lotto/spedizione']);
  }

}
