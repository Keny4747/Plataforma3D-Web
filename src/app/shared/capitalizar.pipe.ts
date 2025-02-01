import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalizar'
})
export class CapitalizarPipe implements PipeTransform {

  transform(value: string | null, todas: boolean = true): string {
    if (!value) return '';

    if (todas) {

      return value
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
    } else {

      return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    }
  }
}
