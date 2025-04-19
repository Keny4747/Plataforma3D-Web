import { Component, OnInit } from '@angular/core';
import { Modelo3D } from '../../admin/modelo3d/shared/modelo3d.model';
import { Modelo3dService } from '../../admin/modelo3d/shared/modelo3d.service';
import { ImgModelos3dPipe } from '../../shared/img-modelos3d.pipe';

@Component({
  selector: 'app-modelo3-home',
  templateUrl: './modelo3-home.component.html',
  styleUrls: ['./modelo3-home.component.scss'],
  providers: [ImgModelos3dPipe]
})
export class Modelo3HomeComponent implements OnInit {
  modelos: Modelo3D[] = [];
  sortOrder: number = 0;
  sortField: string = '';

  constructor(
    private modelo3DService: Modelo3dService
  ) { }

  ngOnInit() {
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
}
