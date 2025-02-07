import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { Book } from 'src/app/admin/contenido-adicional/shared/book.model';
import { ContenidoService } from 'src/app/admin/contenido-adicional/shared/contenido.service';
import { ApiImgPipePipe } from 'src/app/shared/api-img-pipe.pipe';
import { saveAs } from 'file-saver'
@Component({
  selector: 'app-contenido-listar-home',
  templateUrl: './contenido-listar-home.component.html',
  styleUrls: ['./contenido-listar-home.component.scss'],
  providers: [ApiImgPipePipe]

})
export class ContenidoListarHomeComponent implements OnInit{

  books: Book[] = [];

  sortOptions: SelectItem[] = [];

  sortOrder: number = 0;

  sortField: string = '';

  sourceCities: any[] = [];

  targetCities: any[] = [];

  orderCities: any[] = [];

  constructor(private productService: ContenidoService) { }

  ngOnInit() {
      this.productService.getAll().subscribe(data => this.books = data);



      this.sortOptions = [
          { label: 'Price High to Low', value: '!price' },
          { label: 'Price Low to High', value: 'price' }
      ];
  }

  onSortChange(event: any) {
      const value = event.value;

      if (value.indexOf('!') === 0) {
          this.sortOrder = -1;
          this.sortField = value.substring(1, value.length);
      } else {
          this.sortOrder = 1;
          this.sortField = value;
      }
  }
  downloadFile(filename: string, title: string) {
    this.productService.downloadFile(filename).subscribe(
      (blob: Blob) => {
        saveAs(blob, title + '.pdf');
      },
      error => {
        console.error('Error al descargar el archivo:', error);
      }
    );
  }


}
