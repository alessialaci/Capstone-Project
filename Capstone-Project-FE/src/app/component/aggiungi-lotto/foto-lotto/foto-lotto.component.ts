import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-foto-lotto',
  templateUrl: './foto-lotto.component.html',
  styleUrls: ['./foto-lotto.component.scss']
})
export class FotoLottoComponent implements OnInit {

  images: string[] = [];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    event.dataTransfer!.dropEffect = 'copy';
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const files = event.dataTransfer!.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onload = () => {
        this.images.push(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  aggiornaDatiLotto() {
    this.router.navigate(['/aggiungi-lotto/valore']);
  }
}
