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
  private idGenerado: string | null = null;

  constructor(private servicio: Modelo3dService) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.mensaje = '';
    this.modelo = null;
    this.idGenerado = null;
  }

  enviarImagen() {
    if (this.selectedFile) {
      this.cargando = true;
      this.idGenerado = uuidv4(); // 1. Generar el ID

      this.servicio.enviarImagen(this.selectedFile, this.idGenerado).subscribe({
        error: err => {
          console.warn('Error esperado al enviar imagen (puede ser 524):', err);
        }
      });

      const intervalo = setInterval(() => {
        if (!this.idGenerado) return;
        //imprimir el ID generado
        console.log('ID GENERADO:', this.idGenerado);

        this.servicio.getGenerado(this.idGenerado).subscribe({
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
      }, 3000);
    }
  }

  descargarModelo() {
    if (this.modelo?.url) {
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
    if (this.modelo?.url) {
      navigator.clipboard.writeText(this.modelo.url)
        .then(() => console.log('URL copiada al portapapeles'))
        .catch(err => console.error('Error al copiar URL:', err));
    }
  }

  cargarModelos() {
    if (!this.idGenerado) return;
    this.servicio.getGenerado(this.idGenerado).subscribe({
      next: data => this.modelo = data,
      error: err => console.error('Error al obtener modelos', err)
    });
  }
}
