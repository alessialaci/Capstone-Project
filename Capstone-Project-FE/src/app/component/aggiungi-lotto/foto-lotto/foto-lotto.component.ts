import { Component, OnInit } from '@angular/core';
import { of, switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { Foto } from 'src/app/models/foto.interface';
import { Opera } from 'src/app/models/opera.interface';
import { StorageService } from 'src/app/auth/storage.service';
import { FotoService } from 'src/app/services/foto.service';
import { OpereService } from 'src/app/services/opere.service';
import { LoadingBarService } from '@ngx-loading-bar/core';

@Component({
  selector: 'app-foto-lotto',
  templateUrl: './foto-lotto.component.html',
  styleUrls: ['./foto-lotto.component.scss']
})
export class FotoLottoComponent implements OnInit {

  files: File[] = [];
  operaSS: Opera | undefined;
  opera: Opera | undefined;
  errore = '';

  constructor(private ss: StorageService, private fs: FotoService, private os: OpereService, private router: Router, private loadingBar: LoadingBarService) { }

  ngOnInit() {
    this.operaSS = this.ss.getOpera();

    if(this.operaSS) {
      this.os.getOperaById(this.operaSS.id).subscribe(op => {
        this.opera = op;
      })
    }
  }

  // Per aggiungere le immagini all'array files quando l'utente le seleziona
  onSelect(event: any) {
    this.files.push(...event.addedFiles);
  }

  // Per rimuovere le immagini dall'array files quando l'utente le elimina
  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  // Per salvare su Cloudinary le immagini inserite dall'utente e il link di queste nel DB
  aggiornaDatiLotto() {
    this.operaSS = this.ss.getOpera();

    if(this.opera) {
      if (this.files.length < 3) {
        this.errore = 'Inserisci almeno 3 immagini prima di continuare';
        return;
      }

      this.loadingBar.start();

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
          this.loadingBar.complete();
          this.router.navigate(['/aggiungi-lotto/valore']);
        });
      }
    }
  }

}
