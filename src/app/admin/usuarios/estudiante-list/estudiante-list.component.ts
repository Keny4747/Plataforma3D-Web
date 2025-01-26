import { Component, OnInit } from '@angular/core';
import { Estudiante } from '../shared/estudiante.model';
import { UsuariosService } from '../shared/usuarios.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//prime ng
import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

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
    dni: '',
    role: ''
  };

  selectedProducts: Estudiante[] = [];

  submitted: boolean = false;

  rowsPerPageOptions = [5, 10, 20];

  //form group

  form: FormGroup;


  constructor(
    private usuarioService: UsuariosService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private router: Router
   ) {

    this.form = this.fb.group({
      nombre: [,[Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      apellido: [,[Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      email: [, [Validators.required, Validators.email]],
      username: [, [Validators.required]],
      password: [, [Validators.required]],
      telefono: [, [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      dni: [, [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern('^[0-9]*$')]],
      role: ['USER', [Validators.required]],

    });

    }

  ngOnInit(): void {
    this.getEstudiantes();



    this.form.get('nombre')?.valueChanges.subscribe(() => {
      this.createUsername();
      this.createPassword();
    });

    this.form.get('apellido')?.valueChanges.subscribe(() => this.createUsername());

    this.form.get('dni')?.valueChanges.subscribe(() => {
      this.createUsername();
      this.createPassword();
    });

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
    dni: '',
    role: 'USER'
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

deleteUsuario(estudiante: Estudiante) {
    this.deleteProductDialog = true;
    this.estudiante = { ...estudiante };

    if (estudiante.id !== undefined) {
      this.usuarioService.deleteEstudiante(estudiante.id).subscribe(() => {
        this.getEstudiantes();
      });
    }
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
      role: '',
      dni: ''
    };
}

hideDialog() {
    this.productDialog = false;
    this.submitted = false;
}


saveEstudiante() {

  this.submitted = true;
  this.createPassword();
  if (this.form.invalid) {
    console.log('Formulario inválido');
    Object.keys(this.form.controls).forEach((key) => {
      const control = this.form.get(key);
      if (control?.invalid) {
        console.log(`Campo ${key} es inválido:`, control.errors); // Imprime los errores de cada campo
      }
    });
    this.form.markAllAsTouched();
    return;
  }

  if (this.estudiante.id) {
    // Lógica para actualizar el estudiante (si es necesario)
    // this.usuarioService.updateEstudiante(this.estudiante.id, this.form.value).subscribe({
    //   next: (data) => {
    //     const index = this.findIndexById(this.estudiante.id);
    //     this.estudiantes1[index] = data;
    //     this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Estudiante Actualizado', life: 3000 });
    //     this.productDialog = false;
    //     this.form.reset();
    //   },
    //   error: (err) => {
    //     console.error('Error al actualizar estudiante:', err);
    //   },
    // });
  } else {
    // Lógica para crear un nuevo estudiante

    this.createUsername();
    this.usuarioService.createEstudiante(this.form.value).subscribe({
      next: (data) => {
        this.estudiantes1.push(data); // Agregar a estudiantes1
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Estudiante Creado', life: 3000 });
        this.productDialog = false;
        this.form.reset(); // Restablecer el formulario
        this.router.navigate(['/estudiantes']);
      },
      error: (err) => {
        console.error('Error al crear estudiante:', err);
      },
    });
  }
}
createUsername(): void {
  const nombre = this.form.get('nombre')?.value?.trim().substring(0, 2)?.toLowerCase() || '';
  const apellido = this.form.get('apellido')?.value?.trim().substring(0, 3)?.toLowerCase() || '';
  const dni = this.form.get('dni')?.value?.trim().substring(0, 2) || '';
  const username = nombre + apellido + dni;
  this.form.get('username')?.setValue(username, { emitEvent: false });

}
createPassword(): void {
  const nombre = this.form.get('nombre')?.value?.trim().substring(0, 2)?.toLowerCase() || '';
  const dni = this.form.get('dni')?.value?.trim() || '';

  const password = nombre + dni;
  this.form.get('password')?.setValue(password, { emitEvent: false });

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
