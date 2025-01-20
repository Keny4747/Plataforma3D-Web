import { Component, OnInit } from '@angular/core';
import { Estudiante } from '../shared/estudiante.model';
import { UsuariosService } from '../shared/usuarios.service';

@Component({
  selector: 'app-estudiante-list',
  templateUrl: './estudiante-list.component.html',
})
export class EstudianteListComponent implements OnInit {

  estudiantes : Estudiante[] = [];


  constructor(private usuarioService: UsuariosService  ) { }

  ngOnInit(): void {
    this.getEstudiantes();
  }


  getEstudiantes(): void {
    this.usuarioService.getEstudiantes().subscribe({
      next: (data) => {
        this.estudiantes = data;
      },
      error: (err) => {
        console.error('Error al obtener estudiantes:', err);
      },
    });
  }
}
