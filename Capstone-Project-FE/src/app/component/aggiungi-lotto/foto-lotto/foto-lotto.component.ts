import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { of, switchMap } from 'rxjs';
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
  opera: Opera | undefined;
  opere: Opera[] | undefined;

  constructor(private ss: StorageService, private fs: FotoService, private os: OpereService, private router: Router) { }

  ngOnInit() {
    this.operaSS = this.ss.getOpera();
    console.log(this.operaSS);

    if(this.operaSS) {
      this.os.getOperaById(this.operaSS.id).subscribe(op => {
        this.opera = op;
        console.log(op);

      })
    }
  }

  onSelect(event: any) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  // aggiornaDatiLotto() {
  //   if(this.files.length < 3) {
  //     this.errore = 'Inserisci almeno 3 immagini prima di continuare';
  //     return;
  //   }

  //   for (let i = 0; i < this.files.length; i++) {
  //     const data = new FormData();
  //     data.append('file', this.files[i]);
  //     data.append('upload_preset', 'artia_cloudinary');
  //     data.append('cloud_name', 'dwe3fc2iq');

  //     this.fs.uploadImage(data).subscribe(response => {
  //       if (response) {
  //         console.log(response);
  //         this.aggiungiFotoSuDb(response.secure_url);
  //       }
  //     });
  //   }

  //   this.router.navigate(['/aggiungi-lotto/valore']);
  // }


  aggiornaDatiLotto() {
    if (this.files.length < 3) {
      this.errore = 'Inserisci almeno 3 immagini prima di continuare';
      return;
    }

    for (let i = 0; i < this.files.length; i++) {
      const data = new FormData();
      data.append('file', this.files[i]);
      data.append('upload_preset', 'artia_cloudinary');
      data.append('cloud_name', 'dwe3fc2iq');

      this.fs.uploadImage(data).pipe(
        switchMap(response => {
          if (response) {
            let url = response.secure_url;

            const nuovaFoto: Partial<Foto> = {
              file: url,
              opera: this.opera
            };
            return this.fs.addFoto(nuovaFoto);
          } else {
            return of(null);
          }
        })
      ).subscribe((response) => {
        console.log('Foto aggiunta con successo', response);
      });

      this.router.navigate(['/aggiungi-lotto/valore']);
    }
  }

}
