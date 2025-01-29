import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContenidoService } from '../shared/contenido.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Book } from '../shared/book.model';

@Component({
  selector: 'app-editar-contenido-adicional',
  templateUrl: './editar-contenido-adicional.component.html'
})
export class EditarContenidoAdicionalComponent {

  bookForm: FormGroup;
    coverFile: File | null = null;
    contentFile: File | null = null;

    constructor(
      private fb: FormBuilder,
      private contenidoService: ContenidoService,
      private messageService: MessageService,
      private router: Router
    ) {
      this.bookForm = this.fb.group({
        title: ['', Validators.required],
        description: ['', Validators.required],
      });
    }

    onCoverSelect(event: any): void {
      const file = event.target.files[0];
      if (file) {
        this.coverFile = file;
        console.log('Portada seleccionada:', this.coverFile); // Depuración
      }
    }

    onContentSelect(event: any): void {
      const file = event.target.files[0];
      if (file) {
        this.contentFile = file;
        console.log('Contenido seleccionado:', this.contentFile); // Depuración
      }
    }

    onUpload(): void {
      if (this.bookForm.invalid || !this.coverFile || !this.contentFile) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Por favor, complete todos los campos y seleccione los archivos.',
        });
        return;
      }

      const { title, description } = this.bookForm.value;
      const files = [this.coverFile, this.contentFile];

      this.contenidoService.uploadFiles(files).subscribe(
        (response) => {
          const [coverPath, filePath] = response.filenames;

          const book: Book = {
            title: title,
            description: description,
            coverPath: coverPath,
            filePath: filePath,
          };

          this.contenidoService.create(book).subscribe(
            (response) => {
              this.messageService.add({
                severity: 'success',
                summary: 'Éxito',
                detail: 'El libro se ha guardado correctamente.',
              });
              this.router.navigate(['/listar-contenido-adicional']);
            },
            (error) => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Hubo un error al guardar el libro: ' + error.message,
              });
            }
          );
        },
        (error) => {
          console.error('Error al subir archivos:', error); // Depuración
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Hubo un error al subir los archivos: ' + error.message,
          });
        }
      );
    }

}
