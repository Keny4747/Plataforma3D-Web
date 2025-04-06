import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'imgModelos3d'
})
export class ImgModelos3dPipe implements PipeTransform {

  transform(value: string | null | undefined): string {

    if (!value) {
      return 'assets/img/default-cover.jpg';
    }


    return value;
  }

}
