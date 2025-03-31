import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Modelo3dService } from '../shared/modelo3d.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { UnidadAprendizajeEnum } from '../../contenido-adicional/shared/book.model';
import { Modelo3D } from '../shared/modelo3d.model';

@Component({
  selector: 'app-cargar-modelo3d',
  templateUrl: './cargar-modelo3d.component.html',
  styleUrls: ['./cargar-modelo3d.component.scss']
})
export class CargarModelo3dComponent {
  model3DForm: FormGroup;

  unidadApr = Object.keys(UnidadAprendizajeEnum)
    .filter(key => isNaN(Number(key)))
    .map(key => ({ name: UnidadAprendizajeEnum[key as keyof typeof UnidadAprendizajeEnum], value: key }));

  constructor(
    private fb: FormBuilder,
    private modeloService: Modelo3dService,
    private messageService: MessageService,
    private router: Router
  ) {
    this.model3DForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      unidadAprendizajeSelect: ['', Validators.required],
      esExterno: [false],
      embedCode: ['']
    });


    this.model3DForm.get('esExterno')?.valueChanges.subscribe((value) => {
      if (value) {
        this.model3DForm.get('embedCode')?.setValidators([Validators.required]);
      } else {
        this.model3DForm.get('embedCode')?.clearValidators();
        this.model3DForm.get('embedCode')?.setValue('');
      }
      this.model3DForm.get('embedCode')?.updateValueAndValidity();
    });
  }

  onUpload(): void {
    if (this.model3DForm.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Por favor, completa todos los campos obligatorios.',
      });
      return;
    }



    const modelo3D: Modelo3D = {
      nombre: this.model3DForm.value.nombre,
      embedCode: this.model3DForm.value.embedCode,
      esExterno: this.model3DForm.value.esExterno,
      descripcion: this.model3DForm.value.descripcion,
      unidadAprendizaje: this.model3DForm.value.unidadAprendizajeSelect.value



    };
    console.log('Unidad Aprendizaje:', this.model3DForm.value.unidadAprendizajeSelect);
    console.log('Valor enviado:', modelo3D.unidadAprendizaje);
    console.log('objetooo enviado:', modelo3D);

    this.modeloService.create(modelo3D).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'El modelo 3D se ha guardado correctamente.',
        });
        this.router.navigate(['/listar-modelos3d']);
      },
      (error) => {
        console.error('Error al guardar modelo 3D:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Hubo un error al guardar el modelo 3D.',
        });
      }
    );
  }
}
