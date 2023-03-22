import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/auth/storage.service';
import { Foto } from 'src/app/models/foto.interface';
import { Opera } from 'src/app/models/opera.interface';
import { FotoService } from 'src/app/services/foto.service';
import { OpereService } from 'src/app/services/opere.service';

@Component({
  selector: 'app-foto-lotto',
  templateUrl: './foto-lotto.component.html',
  styleUrls: ['./foto-lotto.component.scss']
})
export class FotoLottoComponent implements OnInit {

  files: File[] = [];
  fotoOpere: Partial<Foto>[] = [];
  errore = '';
  operaSS: Opera | undefined;

  constructor(private ss: StorageService, private fs: FotoService, private os: OpereService, private router: Router) { }

  ngOnInit() {
    this.operaSS = this.ss.getOpera();
  }

  onSelect(event: any) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  aggiornaDatiLotto() {
    if(this.files.length < 3) {
      this.errore = 'Inserisci almeno 3 immagini prima di continuare';
      return;
    }

    for (let i = 0; i < this.files.length; i++) {
      const data = new FormData();
      data.append('file', this.files[i]);
      data.append('upload_preset', 'artia_cloudinary');
      data.append('cloud_name', 'dwe3fc2iq');

      this.fs.uploadImage(data).subscribe(response => {
        if (response) {
          let foto = this.aggiungiFotoSuDb(response.secure_url);
          this.fotoOpere.push(foto);
        }
      });
    }

    this.router.navigate(['/aggiungi-lotto/valore']);
  }

  aggiungiFotoSuDb(url: string) {
    const nuovaFoto: Partial<Foto> = {
      file: url,
      opera: this.operaSS
    };

    this.fs.addFoto(nuovaFoto).subscribe(
      response => {
        console.log('Foto aggiunta con successo', response);
      }
    );

    return nuovaFoto;
  }

}
