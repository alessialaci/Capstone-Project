import { Component, OnInit } from '@angular/core';
import { Preferito } from 'src/app/models/preferito.interface';
import { StorageService } from 'src/app/auth/storage.service';
import { PreferitiService } from 'src/app/services/preferiti.service';

@Component({
  selector: 'app-preferiti',
  templateUrl: './preferiti.component.html',
  styleUrls: ['./preferiti.component.scss']
})
export class PreferitiComponent implements OnInit {

  listaPreferiti: Preferito[] = [];
  paginaCorrente: number = 1;

  constructor(private ss: StorageService, private ps: PreferitiService) { }

  ngOnInit(): void {
    this.getPreferiti();
  }

  // Per recuperare tutti i preferiti dell'utente loggato
  getPreferiti() {
    let utenteSS = this.ss.getUser();
    this.ps.getPreferitiByUtenteId(utenteSS.id).subscribe(preferiti => {
      this.listaPreferiti = preferiti.filter(preferito => preferito.opera.statoLotto == 'APPROVATO');
    })
  }

}
