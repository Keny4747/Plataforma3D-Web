import { Component, OnInit } from '@angular/core';
import { Estudiante } from '../shared/estudiante.model';
import { UsuariosService } from '../shared/usuarios.service';
//prime ng
import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-estudiante-list',
  templateUrl: './estudiante-list.component.html',
  providers: [MessageService]
})
export class EstudianteListComponent implements OnInit {

  estudiantes1 : Estudiante[] = [];

  //prime ng
  productDialog: boolean = false;

  deleteProductDialog: boolean = false;

  deleteProductsDialog: boolean = false;

  estudiantes: Estudiante[] = [];

  estudiante: Estudiante = {
    nombre: '',
    apellido: '',
    email: '',
    username: '',
    password: '',
    telefono: '',
    dni: ''
    // Add other required properties here
  };

  selectedProducts: Estudiante[] = [];

  submitted: boolean = false;


  rowsPerPageOptions = [5, 10, 20];
  constructor(private usuarioService: UsuariosService, private messageService: MessageService  ) { }

  ngOnInit(): void {
    this.getEstudiantes();

  }


  getEstudiantes(): void {
    this.usuarioService.getEstudiantes().subscribe({
      next: (data) => {
        this.estudiantes = data;
      },
      error: (err) => {
        console.error('Error al obtener estudiantes:', err);
      },
    });
  }



  //PRIME NG TABLE


openNew() {
  this.estudiante = {
    nombre: '',
    apellido: '',
    email: '',
    username: '',
    password: '',
    telefono: '',
    dni: ''
  };
    this.submitted = false;
    this.productDialog = true;
}

deleteSelectedProducts() {
    this.deleteProductsDialog = true;
}

editProduct(product: Estudiante) {
    this.estudiante = { ...product };
    this.productDialog = true;
}

deleteProduct(product: Estudiante) {
    this.deleteProductDialog = true;
    this.estudiante = { ...product };
}

confirmDeleteSelected() {
    this.deleteProductsDialog = false;
    this.estudiantes = this.estudiantes.filter(val => !this.selectedProducts.includes(val));
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Estudiantes Eliminados', life: 3000 });
    this.selectedProducts = [];
}

confirmDelete() {
    this.deleteProductDialog = false;
    this.estudiantes = this.estudiantes.filter(val => val.id !== this.estudiante.id);
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Estudiante Eliminado', life: 3000 });
    this.estudiante = {
      nombre: '',
      apellido: '',
      email: '',
      username: '',
      password: '',
      telefono: '',
      dni: ''
    };
}

hideDialog() {
    this.productDialog = false;
    this.submitted = false;
}

saveProduct() {
    this.submitted = true;

    if (this.estudiante.nombre?.trim()) {
        if (this.estudiante.id) {
            // @ts-ignore
            this.product.inventoryStatus = this.product.inventoryStatus.value ? this.product.inventoryStatus.value : this.product.inventoryStatus;
            this.estudiantes[this.findIndexById(this.estudiante.id)] = this.estudiante;
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
        } else {
            this.estudiante.id = this.createId();

            // @ts-ignore
            this.estudiantes.push(this.estudiante);
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
        }

        this.estudiantes = [...this.estudiantes];
        this.productDialog = false;
        this.estudiante = {
          nombre: '',
          apellido: '',
          email: '',
          username: '',
          password: '',
          telefono: '',
          dni: ''
        };
    }
}

findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.estudiantes.length; i++) {
        if (this.estudiantes[i].id === id) {
            index = i;
            break;
        }
    }

    return index;
}

createId(): string {
    let id = '';

    for (let i = 0; i < 5; i++) {
        id = id + i;
    }
    return id;
}

onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
}


}
