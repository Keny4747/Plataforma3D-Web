import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContenidoService } from '../shared/contenido.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../shared/book.model';
import { ApiImgPipePipe } from 'src/app/shared/api-img-pipe.pipe';

@Component({
  selector: 'app-editar-contenido-adicional',
  templateUrl: './editar-contenido-adicional.component.html',
   providers: [MessageService,ApiImgPipePipe]
})
export class EditarContenidoAdicionalComponent implements OnInit {

  currentBook: Book | null = null;
  bookForm: FormGroup;
  coverFile: File | null = null;
  contentFile: File | null = null;
  coverImageUrl: string | null = null;
  bookId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private contenidoService: ContenidoService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      coverPath: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.bookId = +this.route.snapshot.paramMap.get('id')!;

    if (this.bookId) {
      this.contenidoService.get(this.bookId).subscribe(
        (book) => {
          this.currentBook = book; // Guardar el libro actual
          this.bookForm.patchValue({
            title: book.title,
            description: book.description,
            coverPath: book.coverPath,
          });
          this.coverImageUrl = book.coverPath;
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo cargar el libro: ' + error.message,
          });
          this.router.navigate(['/listar-contenido-adicional']);
        }
      );
    }
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

  onContentSelect(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.contentFile = file;
    }
  }

  onSave(): void {
    if (this.bookForm.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Por favor, complete todos los campos.',
      });
      return;
    }

    const { title, description } = this.bookForm.value;

    // Crear un arreglo con los archivos seleccionados (sin valores nulos)
    const files: File[] = [this.coverFile, this.contentFile].filter((file): file is File => file !== null);

    // Subir archivos solo si hay archivos válidos
    if (files.length > 0) {
      this.contenidoService.uploadFiles(files).subscribe(
        (response) => {
          const [coverPath, filepath] = response.filenames;
          this.updateBook(title, description, coverPath, filepath);
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Hubo un error al subir los archivos: ' + error.message,
          });
        }
      );
    } else {
      // Actualizar sin cambiar los archivos
      this.updateBook(title, description, null, null);
    }
  }



  private updateBook(title: string, description: string, coverPath: string | null, filepath: string | null): void {
    // Verificar que this.currentBook no sea null
    if (!this.currentBook) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'No se ha cargado el libro actual.',
      });
      return;
    }

    const book: Book = {
      id: this.bookId!,
      title: title,
      description: description,
      coverPath: coverPath || this.currentBook.coverPath, // Usar la portada actual si no se cambia
      filePath: filepath || this.currentBook.filePath,    // Usar el archivo actual si no se cambia
    };

    this.contenidoService.update(book).subscribe(
      (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'El libro se ha actualizado correctamente.',
        });
        this.router.navigate(['/listar-contenido-adicional']);
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Hubo un error al actualizar el libro: ' + error.message,
        });
      }
    );
  }
}
