import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../shared/usuarios.service';
import { Estudiante } from '../shared/estudiante.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-estudiante-detail',
  templateUrl: './estudiante-detail.component.html',
  styleUrls: ['./estudiante-detail.component.scss'],
  providers: [MessageService]
})
export class EstudianteDetailComponent implements OnInit {
    estudiante: Estudiante | null = null;
    estudianteId: number | null = null;

  constructor(
    private userService: UsuariosService,
    private route: ActivatedRoute,
private messageService: MessageService
  ) { }



  ngOnInit(): void {
    this.estudianteId = +this.route.snapshot.paramMap.get('id')!;
    if (this.estudianteId) {
      this.userService. getEstudianteById(this.estudianteId).subscribe(
        (estudiante) => {
          this.estudiante = estudiante;
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo cargar el estudiante: ' + error.message,
          });

        }
      );
    }

  }





}
