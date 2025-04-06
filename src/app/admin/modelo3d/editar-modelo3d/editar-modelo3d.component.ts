import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Modelo3D } from '../shared/modelo3d.model';
import { UnidadAprendizajeEnum } from '../../contenido-adicional/shared/book.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Modelo3dService } from '../shared/modelo3d.service';
import { MessageService } from 'primeng/api';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-editar-modelo3d',
  templateUrl: './editar-modelo3d.component.html',
  styleUrls: ['./editar-modelo3d.component.scss']
})
export class EditarModelo3dComponent implements OnInit {

  model3DForm: FormGroup;
  selectedFile: File | null = null;
  coverFile: File | null = null;
  coverImageUrl: string | null = null;

  unidadApr = Object.keys(UnidadAprendizajeEnum)
    .filter(key => isNaN(Number(key)))
    .map(key => ({ name: UnidadAprendizajeEnum[key as keyof typeof UnidadAprendizajeEnum], value: key }));

  modeloId: number | null = null;
  modeloActual: Modelo3D | null = null;

  constructor(
    private fb: FormBuilder,
    private modeloService: Modelo3dService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.model3DForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      unidadAprendizajeSelect: ['', Validators.required],
      esExterno: [false],
      embedCode: [''],
      coverPath: ['']
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

  ngOnInit(): void {
    this.modeloId = +this.route.snapshot.paramMap.get('id')!;
    if (this.modeloId) {
      this.modeloService.get(this.modeloId).subscribe(
        modelo => {
          this.modeloActual = modelo;
          this.model3DForm.patchValue({
            nombre: modelo.nombre,
            descripcion: modelo.descripcion,
            unidadAprendizajeSelect: modelo.unidadAprendizaje,
            esExterno: modelo.esExterno,
            embedCode: modelo.embedCode,
            coverPath: modelo.coverPath
          });
          this.coverImageUrl = modelo.coverPath!;
        },
        err => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo cargar el modelo: ' + err.message
          });
          this.router.navigate(['/listar-modelos3d']);
        }
      );
    }
  }

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onCoverSelect(event: any): void {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
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
        detail: 'Por favor, selecciona un archivo de imagen válido.'
      });
      event.target.value = '';
    }
  }

  onUpload(): void {
    if (this.model3DForm.invalid || !this.modeloActual) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Por favor, completa todos los campos obligatorios.'
      });
      return;
    }

    const esExterno = this.model3DForm.value.esExterno;

    const unidadAprendizajeValue = this.model3DForm.value.unidadAprendizajeSelect.value || this.model3DForm.value.unidadAprendizajeSelect;

    if (esExterno) {
      // Solo sube imagen si fue seleccionada
      if (this.coverFile) {
        this.modeloService.uploadFile(this.coverFile, 'imagen').subscribe(
          res => {
            const coverPath = res.filenames[0];
            this.updateModelo(coverPath, null);
          },
          err => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Error al subir la imagen de portada.'
            });
          }
        );
      } else {
        this.updateModelo(null, null); // actualiza sin cambiar portada
      }
    } else {
      // Modelo local
      if (this.selectedFile && this.coverFile) {
        forkJoin([
          this.modeloService.uploadFile(this.coverFile, 'imagen'),
          this.modeloService.uploadFile(this.selectedFile, 'modelos3D')
        ]).subscribe(
          ([imgRes, modelRes]) => {
            this.updateModelo(imgRes.filenames[0], modelRes.filenames[0]);
          },
          err => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Error al subir archivos.'
            });
          }
        );
      } else {
        this.updateModelo(null, null); // actualiza solo metadatos
      }
    }
  }

  private updateModelo(coverPath: string | null, filePath: string | null): void {
    const formValues = this.model3DForm.value;

    const modelo: Modelo3D = {
      id: this.modeloId!,
      nombre: formValues.nombre,
      descripcion: formValues.descripcion,
      unidadAprendizaje: formValues.unidadAprendizajeSelect.value || formValues.unidadAprendizajeSelect,
      esExterno: formValues.esExterno,
      embedCode: formValues.esExterno ? formValues.embedCode : undefined,
      url: formValues.esExterno ? undefined : (filePath || this.modeloActual!.url),
      coverPath: coverPath || this.modeloActual!.coverPath
    };

    this.modeloService.update(modelo).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'El modelo 3D se actualizó correctamente.'
        });
        this.router.navigate(['/listar-modelos3d']);
      },
      err => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Hubo un error al actualizar el modelo.'
        });
      }
    );
  }
}


