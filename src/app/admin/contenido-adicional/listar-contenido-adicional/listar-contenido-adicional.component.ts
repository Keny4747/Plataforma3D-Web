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

  bookToDelete: Book | null = null;

  //prime ng
  productDialog: boolean = false;

  deleteProductDialog: boolean = false;

  deleteProductsDialog: boolean = false;

  books: Book[] = [];
  book: Book = {
    title: '',
    description: '',
    coverPath: '',
    filePath: '',
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



deleteLibro(book: Book): void {
  this.bookToDelete = book; // Guardar el libro seleccionado
  this.deleteProductDialog = true; // Mostrar el diálogo de confirmación
}

confirmDelete(): void {
  if (this.bookToDelete && this.bookToDelete.id !== undefined) {
    this.contenidoService.delete(this.bookToDelete.id).subscribe({
      next: () => {
        // Mostrar mensaje de éxito
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Libro eliminado correctamente',
          life: 3000,
        });

        // Recargar la lista de libros
        this.getLibros();
      },
      error: (err) => {
        // Mostrar mensaje de error
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar el libro: ' + err.message,
          life: 3000,
        });
      },
    });
  }

  // Cerrar el diálogo de confirmación
  this.deleteProductDialog = false;
  this.bookToDelete = null; // Limpiar el libro seleccionado
}

hideDialog() {
    this.productDialog = false;
    this.submitted = false;
}


onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
}

}
