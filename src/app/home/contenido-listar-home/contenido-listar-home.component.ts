import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Book } from 'src/app/admin/contenido-adicional/shared/book.model';
import { ContenidoService } from 'src/app/admin/contenido-adicional/shared/contenido.service';

@Component({
  selector: 'app-contenido-listar-home',
  templateUrl: './contenido-listar-home.component.html',
  styleUrls: ['./contenido-listar-home.component.scss'],
  providers: [ButtonModule]

})
export class ContenidoListarHomeComponent implements OnInit{

  products: Book[] = [];

  sortOptions: SelectItem[] = [];

  sortOrder: number = 0;

  sortField: string = '';

  sourceCities: any[] = [];

  targetCities: any[] = [];

  orderCities: any[] = [];

  constructor(private productService: ContenidoService) { }

  ngOnInit() {
      this.productService.getAll().subscribe(data => this.products = data);



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



}
