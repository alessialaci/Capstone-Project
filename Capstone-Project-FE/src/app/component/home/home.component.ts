import { Component, OnInit } from '@angular/core';
import { Opera } from 'src/app/models/opera.interface';
import { OpereService } from 'src/app/services/opere.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  listaUltimeOpere: Opera[] = [];

  constructor(private os: OpereService) { }

  ngOnInit(): void {
    this.getUlimiLotti();
  }

  getUlimiLotti() {
    this.os.getOpere().subscribe(opere => {
      this.listaUltimeOpere = opere.filter(opera => opera.statoLotto === "APPROVATO").slice(-3);
    })
  }

}
