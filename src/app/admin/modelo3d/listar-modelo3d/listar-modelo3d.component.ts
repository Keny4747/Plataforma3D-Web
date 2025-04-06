import { Component } from '@angular/core';
import { Modelo3D } from '../shared/modelo3d.model';
import { MessageService } from 'primeng/api';
import { Modelo3dService } from '../shared/modelo3d.service';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-listar-modelo3d',
  templateUrl: './listar-modelo3d.component.html',
  styleUrls: ['./listar-modelo3d.component.scss']
})
export class ListarModelo3dComponent {
  modelos: Modelo3D[] = [];
  modeloToDelete: Modelo3D | null = null;

  // PrimeNG
  deleteProductDialog: boolean = false;
  selectedModelos: Modelo3D[] = [];
  rowsPerPageOptions = [5, 10, 20];

  constructor(
    private messageService: MessageService,
    private modelo3DService: Modelo3dService,
    private router: Router,

  ) {}

  ngOnInit(): void {
    this.getModelos();
  }

  getModelos(): void {
    this.modelo3DService.getAll().subscribe({
      next: (data) => {
        this.modelos = data;
      },
      error: (err) => {
        console.error('Error al obtener modelos 3D:', err);
      },
    });
  }

  deleteModelo(modelo: Modelo3D): void {
    this.modeloToDelete = modelo;
    this.deleteProductDialog = true;
  }


  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
  confirmDelete(): void {
    if (this.modeloToDelete && this.modeloToDelete.id !== undefined) {
      this.modelo3DService.delete(this.modeloToDelete.id).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Modelo 3D eliminado correctamente',
            life: 3000,
          });

          this.getModelos();  // Actualizar la lista
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo eliminar el modelo: ' + err.message,
            life: 3000,
          });
        },
      });
    }
    this.deleteProductDialog = false;
    this.modeloToDelete = null;
  }

}
