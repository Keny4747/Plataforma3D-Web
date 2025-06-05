import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Modelo3dService } from '../shared/modelo3d.service';
import { Modelo3DGenerado } from '../shared/modelo3d.model';
import { interval, retry, Subject, switchMap, takeUntil, takeWhile, tap, timer } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';


@Component({
  selector: 'app-generar-modelo3d',
  templateUrl: './generar-modelo3d.component.html',
  styleUrls: ['./generar-modelo3d.component.scss']
})
export class GenerarModelo3dComponent {
 selectedFile: File | null = null;
  modelo: Modelo3DGenerado | null = null;
  cargando = false;
  mensaje = '';

  constructor(private servicio: Modelo3dService) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    // Limpiar estados anteriores al seleccionar nuevo archivo
    this.mensaje = '';
    this.modelo = null;
  }

  enviarImagen() {
    if (this.selectedFile) {
      this.cargando = true;

      this.servicio.enviarImagen(this.selectedFile).subscribe({
        error: err => {
          console.warn('Error esperado al enviar imagen (puede ser 524):', err);
        }
      });

      // Comenzar polling inmediatamente
      const intervalo = setInterval(() => {
        this.servicio.getGenerado().subscribe({
          next: data => {
            if (data && data.url) {
              this.modelo = data;
              this.cargando = false;
              clearInterval(intervalo);
            }
          },
          error: err => {
            console.error('Error al obtener modelo generado', err);
            this.cargando = false;
            clearInterval(intervalo);
          }
        });
      }, 3000); // cada 3 segundos
    }
  }

  descargarModelo() {
    if (this.modelo && this.modelo.url) {
      const link = document.createElement('a');
      link.href = this.modelo.url;
      link.download = `${this.modelo.nombre}.glb`;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  copiarUrl() {
    if (this.modelo && this.modelo.url) {
      navigator.clipboard.writeText(this.modelo.url).then(() => {
        // Opcional: mostrar toast o mensaje de confirmación
        console.log('URL copiada al portapapeles');
      }).catch(err => {
        console.error('Error al copiar URL:', err);
      });
    }
  }

  cargarModelos() {
    this.servicio.getGenerado().subscribe({
      next: data => this.modelo = data,
      error: err => console.error('Error al obtener modelos', err)
    });
  }
}
