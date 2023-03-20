import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalcase'
})
export class CapitalcasePipe implements PipeTransform {

  transform(value: any): string {
    if (!value) return '';

    const words = value.split('_');
    const capitalizedWords = words.map((word: any) =>
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    );

    return capitalizedWords.join(' ');
  }

}
