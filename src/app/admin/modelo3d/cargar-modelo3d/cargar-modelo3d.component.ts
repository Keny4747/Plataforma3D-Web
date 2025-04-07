import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Modelo3dService } from '../shared/modelo3d.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { UnidadAprendizajeEnum } from '../../contenido-adicional/shared/book.model';
import { Modelo3D } from '../shared/modelo3d.model';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-cargar-modelo3d',
  templateUrl: './cargar-modelo3d.component.html',
  styleUrls: ['./cargar-modelo3d.component.scss']
})
export class CargarModelo3dComponent {
  model3DForm: FormGroup;
  selectedFile: File | null = null;


  coverFile: File | null = null;
  coverImageUrl: string | null = null;

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
      file: [null]
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


  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
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

    const esExterno = this.model3DForm.value.esExterno;

    if (esExterno) {

      if (this.coverFile) {
        this.modeloService.uploadFile(this.coverFile, 'imagen').subscribe(
          (res) => {
            const coverPath = res.filenames[0];

            const modelo3D: Modelo3D = {
              nombre: this.model3DForm.value.nombre,
              embedCode: this.model3DForm.value.embedCode,
              esExterno: true,
              descripcion: this.model3DForm.value.descripcion,
              coverPath: coverPath,
              unidadAprendizaje: this.model3DForm.value.unidadAprendizajeSelect.value
            };

            this.saveModel(modelo3D);
          },
          (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Error al subir la imagen de portada.',
            });
          }
        );
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Selecciona una imagen de portada para el modelo externo.',
        });
      }
    } else {
      if (!this.selectedFile || !this.coverFile) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Selecciona el archivo del modelo y la imagen de portada.',
        });
        return;
      }


      forkJoin([
        this.modeloService.uploadFile(this.coverFile, 'imagen'),
        this.modeloService.uploadFile(this.selectedFile, 'modelos3D')
      ]).subscribe(
        ([imgRes, modelRes]) => {
          const modelo3D: Modelo3D = {
            nombre: this.model3DForm.value.nombre,
            url: modelRes.filenames[0],
            coverPath: imgRes.filenames[0],
            esExterno: false,
            descripcion: this.model3DForm.value.descripcion,
            unidadAprendizaje: this.model3DForm.value.unidadAprendizajeSelect.value
          };
          this.saveModel(modelo3D);
        },
        (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error al subir archivos al servidor.',
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


  onCoverSelect(event: any): void {
    const file = event.target.files[0];
    if (file) {

      if (file.type.startsWith('image/')) {
        this.coverFile = file;


        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.coverImageUrl = e.target.result;
        };
        reader.readAsDataURL(file);
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Por favor, selecciona un archivo de imagen válido.',
        });
        event.target.value = '';
      }
    }
  }



}
