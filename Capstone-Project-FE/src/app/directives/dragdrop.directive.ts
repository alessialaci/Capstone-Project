import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appDragdrop]'
})
export class DragdropDirective {

  @Output() onFileDropped = new EventEmitter<any>();

  constructor() { }

  @HostListener('dragover', ['$event']) onDragOver(event: any) {
    event.preventDefault();
    event.stopPropagation();
  }

  @HostListener('dragleave', ['$event']) onDragLeave(event: any) {
    event.preventDefault();
    event.stopPropagation();
  }

  @HostListener('drop', ['$event']) onDrop(event: any) {
    event.preventDefault();
    event.stopPropagation();
    const files = event.dataTransfer.files;

    if(files.length > 0) {
      this.onFileDropped.emit(files);
    }
  }

}
