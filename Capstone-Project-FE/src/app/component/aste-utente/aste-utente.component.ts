import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/auth/storage.service';
import { Foto } from 'src/app/models/foto.interface';
import { Offerta } from 'src/app/models/offerta.interface';
import { Opera } from 'src/app/models/opera.interface';
import { FotoService } from 'src/app/services/foto.service';
import { OfferteService } from 'src/app/services/offerte.service';
import { OpereService } from 'src/app/services/opere.service';

@Component({
  selector: 'app-aste-utente',
  templateUrl: './aste-utente.component.html',
  styleUrls: ['./aste-utente.component.scss']
})
export class AsteUtenteComponent implements OnInit {

  utente: any;
  listaOpere: Opera[] = [];
  listaOfferte: Offerta[] = [];
  listaFoto: Foto[] = [];
  ultimaOfferta: Offerta | undefined;
  haOfferte = false;
  paginaCorrente: number = 1;

  constructor(private ss: StorageService, private os: OpereService, private fs: FotoService, private ofs: OfferteService) { }

  ngOnInit(): void {
    this.utente = this.ss.getUser();
    this.getLotti(this.utente);
  }

  getLotti(utente: any) {
    this.os.getOpere().subscribe(opere => {
      this.listaOpere = opere.reverse().filter(opera => opera.autore.id == utente.id);

      // for(let opera of this.listaOpere) {
      //   this.trovaFoto(opera);
      // }

      // this.listaOpere.forEach(opera => {
      //   this.trovaUltimaOfferta(opera);
      //   if(this.ultimaOfferta == undefined) {
      //     this.haOfferte = false;
      //   }
      // });
    })
  }

  checkMostraTasto() {

  }

  // Per recuperare l'ultima offerta legata all'opera presa in considerazione
  // trovaUltimaOfferta(opera: Opera) {
  //   this.ofs.getUltimaOfferta(opera).subscribe(offerta => {
  //     if(offerta) {
  //       this.ultimaOfferta = offerta;
  //     } else {
  //       this.ultimaOfferta = undefined;
  //     }
  //     console.log("ultima offerta opera" + opera.id, this.ultimaOfferta);
  //   });
  // }

  // Per recuperare tutte le immagini legate all'opera presa in considerazione
  // trovaFoto(opera: Opera) {
  //   this.fs.getFotoByOperaId(opera).subscribe(foto => {
  //     this.listaFoto = foto;
  //     console.log(this.listaFoto);
  //   });
  // }

  // eliminaLotto(id: number) {
  //   let conferma = confirm("Sei sicuro di voler eliminare il lotto n." + id + "?");

  //   if(conferma) {
  //     for(let i = 0; i < this.listaFoto.length; i++) {
  //       this.fs.deleteFoto(this.listaFoto[i].id).subscribe(res => {
  //         console.log("foto eliminate");
  //         this.os.deleteOpera(id).subscribe();

  //       })
  //     }


  //   }
  // }

}
