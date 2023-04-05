import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalcase'
})
export class CapitalcasePipe implements PipeTransform {

  // Per trasformare una stringa (es. 'TECNICA_MISTA' che deriva da un enum) in minuscolo con le prime maiuscole e separate da uno spazio (es. 'Tecnica Mista')
  transform(value: any): string {
    if (!value) return '';

    const words = value.split('_');
    const capitalizedWords = words.map((word: any) =>
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    );

    return capitalizedWords.join(' ');
  }

}
