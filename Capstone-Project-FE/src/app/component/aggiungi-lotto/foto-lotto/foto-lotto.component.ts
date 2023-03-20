import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/auth/storage.service';
import { Foto } from 'src/app/models/foto.interface';
import { FotoService } from 'src/app/services/foto.service';
import { OpereService } from 'src/app/services/opere.service';

@Component({
  selector: 'app-foto-lotto',
  templateUrl: './foto-lotto.component.html',
  styleUrls: ['./foto-lotto.component.scss']
})
export class FotoLottoComponent implements OnInit {

  @ViewChild('fileInput', {static: false}) fileInput!: ElementRef

  urlFoto: any[] = []; // qui vanno le path delle immagini che arrivano dall'input
  fotoOpere: Foto[] = [];
  error = ''

  constructor(private ss: StorageService, private fs: FotoService, private os: OpereService, private router: Router) { }

  ngOnInit(): void {
  }

  // onDragOver(event: DragEvent) {
  //   event.preventDefault();
  //   event.stopPropagation();
  //   event.dataTransfer!.dropEffect = 'copy';
  // }

  // onDragLeave(event: DragEvent) {
  //   event.preventDefault();
  //   event.stopPropagation();
  // }

  // onDrop(event: DragEvent) {
  //   event.preventDefault();
  //   event.stopPropagation();
  //   const files = event.dataTransfer!.files;
  //   for (let i = 0; i < files.length; i++) {
  //     const file = files[i];
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       this.images.push(reader.result as string);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // }

  onFileSelected(event: any) {
    if(event.target.files) {
      const file = event.target.files[0];
      // for(let i = 0; i < event.target.files.length; i++) {
      //   const file = event.target.files[i];
      // }
    }
  }

  aggiornaDatiLotto() {
    console.log("foto ok");

    // const imageBlob = this.fileInput.nativeElement.files[0];
    // const file = new FormData();
    // file.set('file', imageBlob);

    // console.log(imageBlob.name.toString());

    // const nuovaFoto: Partial<Foto> = {
    //   foto: imageBlob.name.toString()
    // }

    // this.fs.addFoto(nuovaFoto).subscribe((foto) => {
    //   console.log("Foto caricata con successo", foto);
    // })

    // const operaSS = this.ss.getOpera();

    // const operaAggiornata = {
    //   ...operaSS,
    //   foto: this.fotoOpere // Questo deve essere l'array di FotoOpera, non l'array di stringhe
    // };

    // this.os.updateOpera(operaAggiornata, operaSS.id).subscribe((response) => {
    //   console.log('Opera aggiornata con successo', response);
    // });

    // this.ss.saveOpera(operaAggiornata);

    // this.router.navigate(['/aggiungi-lotto/valore']);
  }

  // ext!: string;

  // onDrag(event: any) {
  //   if(event.length > 5 || this.images.length > 5) {
  //     this.error = "Non è possibile caricare più di 5 file";
  //   } else {
  //     let validFormat = true; // Flag per il controllo del formato
  //     for(let i = 0; i < event.length; i++) {
  //       let nomefile = event[i].name;
  //       let split = nomefile.split(".");
  //       let ext = split[split.length - 1].toLowerCase();
  //       console.log(ext);

  //       if(ext != "jpg" && ext != "png" && ext != "jpeg") { // Se il formato non è corretto, impostiamo il flag a falso
  //         validFormat = false;
  //       }
  //     }

  //     if(!validFormat) { // Se almeno un file ha un formato non corretto, visualizziamo l'errore
  //       this.error = "Formato non valido"
  //     } else {
  //       const files = event;
  //       console.log(files)
  //       for (let i = 0; i < 5; i++) {
  //         const file = files[i];
  //         const reader = new FileReader();
  //         reader.onload = () => {
  //           this.images.push(reader.result as string);
  //         };
  //         reader.readAsDataURL(file);
  //         console.log(reader);

  //       }
  //     }
  //   }
  // }

}
