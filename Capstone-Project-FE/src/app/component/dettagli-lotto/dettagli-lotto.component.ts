import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from 'src/app/auth/storage.service';
import { Opera } from 'src/app/models/opera.interface';
import { Utente } from 'src/app/models/utente.interface';
import { OpereService } from 'src/app/services/opere.service';
import { UtentiService } from 'src/app/services/utenti.service';

@Component({
  selector: 'app-dettagli-lotto',
  templateUrl: './dettagli-lotto.component.html',
  styleUrls: ['./dettagli-lotto.component.scss']
})
export class DettagliLottoComponent implements OnInit {

  utente: Utente | undefined;
  opera: Opera | undefined;
  idOpera!: number;

  constructor(private ss: StorageService, private us: UtentiService, private os: OpereService, private ar: ActivatedRoute) { }

  ngOnInit(): void {
    this.idOpera = this.ar.snapshot.params["id"];
    this.os.getOperaById(this.idOpera).subscribe(o => {
      this.opera = o;
    });
  }

}
