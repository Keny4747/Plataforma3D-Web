import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ContenidoService } from '../shared/contenido.service';
import { Book } from '../shared/book.model';
import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-listar-contenido-adicional',
  templateUrl: './listar-contenido-adicional.component.html',
  providers: [MessageService],
})
export class ListarContenidoAdicionalComponent {

  contenido1 : Book[] = [];

  //prime ng
  productDialog: boolean = false;

  deleteProductDialog: boolean = false;

  deleteProductsDialog: boolean = false;

  books: Book[] = [];
  book: Book = {
    title: '',
    description: '',
    coverPath: '',
    filepath: '',
  };


  selectedProducts: Book[] = [];

  submitted: boolean = false;

  rowsPerPageOptions = [5, 10, 20];

  //form group


  constructor(private messageService:MessageService,
    private contenidoService: ContenidoService,

    private router: Router
   ) {

    }

  ngOnInit( ): void {
    this.getLibros();

  }


  getLibros(): void {
    this.contenidoService.getAll().subscribe({
      next: (data) => {
        this.books = data;
      },
      error: (err) => {
        console.error('Error al obtener libros:', err);
      },
    });
  }



  //PRIME NG TABLE


deleteSelectedProducts() {
    this.deleteProductsDialog = true;
}

editProduct(book: Book) {

    this.productDialog = true;
}

deleteLibro(libro: Book) {
    this.deleteProductDialog = true;
    if (libro.id !== undefined) {
      /*this.contenidoService.deleteEstudiante(estudiante.id).subscribe(() => {
        this.getEstudiantes();
      });
      */
    }
}

confirmDelete() {
    this.deleteProductDialog = false;
    //this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Libro Eliminado', life: 3000 });

}

hideDialog() {
    this.productDialog = false;
    this.submitted = false;
}


onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
}

}
