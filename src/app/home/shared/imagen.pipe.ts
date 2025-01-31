import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

   transform(value: unknown, ...args: unknown[]): unknown {
     return `${environment.apiBase}/api/media/${value}`;
   }
}
