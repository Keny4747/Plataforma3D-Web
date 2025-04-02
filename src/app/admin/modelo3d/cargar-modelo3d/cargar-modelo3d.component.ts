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
  selectedFile: File | null = null; // Para almacenar el archivo seleccionado

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
      embedCode: [''],
      file: [null] // Agregamos el campo para el archivo
    });

    // Escucha cambios en el switch "esExterno"
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

  //  Método para capturar el archivo seleccionado
  onFileChange(event: any) {
    this.selectedFile = event.target.files[0]; // Guarda el archivo en la variable
  }

  // Método para subir archivo y guardar el modelo
  onUpload(): void {
    if (this.model3DForm.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Por favor, completa todos los campos obligatorios.',
      });
      return;
    }

    if (this.model3DForm.value.esExterno) {
      //  Si es externo, solo guarda la URL ingresada
      const modelo3D: Modelo3D = {
        nombre: this.model3DForm.value.nombre,
        embedCode: this.model3DForm.value.embedCode,
        esExterno: true,
        descripcion: this.model3DForm.value.descripcion,
        unidadAprendizaje: this.model3DForm.value.unidadAprendizajeSelect.value
      };

      this.saveModel(modelo3D);
    } else {
      // Si no es externo, sube el archivo a DigitalOcean Spaces
      if (!this.selectedFile) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Selecciona un archivo para subir.',
        });
        return;
      }

      this.modeloService.uploadModel(this.selectedFile).subscribe(
        (response) => {

          const modelo3D: Modelo3D = {
            nombre: this.model3DForm.value.nombre,
            url: response.url,
            esExterno: false,
            descripcion: this.model3DForm.value.descripcion,
            unidadAprendizaje: this.model3DForm.value.unidadAprendizajeSelect.value
          };


          this.saveModel(modelo3D);
        },
        (error) => {
          console.error('Error al subir el modelo 3D:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Hubo un error al subir el modelo 3D.',
          });
        }
      );
    }
  }


  private saveModel(modelo3D: Modelo3D) {
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
        console.error('Error al guardar el modelo 3D:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Hubo un error al guardar el modelo 3D.',
        });
      }
    );
  }
}
