import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../shared/usuarios.service';
import { Docente } from '../shared/docente.model';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { Estudiante } from '../shared/estudiante.model';

@Component({
  selector: 'app-docente-detail',
  templateUrl: './usuario-detail.component.html',
  styleUrls: ['./usuario-detail.component.scss']
})
export class UsuarioDetailComponent implements OnInit {

  docente: Docente | null = null;
  estudiante: Estudiante | null = null;
  usuario : any;
  title : string | null = null;


  constructor(private authService: AuthService, private userService: UsuariosService) {

  }

  ngOnInit(): void {
    const userRole = this.authService.getRole();
    const userId = this.authService.getId();

    console.log('Role: ' + userRole);
    console.log('Id: ' + userId);

    if (userRole === 'ADMIN') {
      this.userService.getDocenteById(userId!).subscribe(
        (data) => {
          this.docente = data;
          this.usuario = this.docente;
          this.title = 'Perfil Docente:';
        },
        (error) => {

        }
      );
    } else {
      this.userService.getEstudianteById(parseInt(userId!)).subscribe(
        (data) => {
          this.estudiante = data;
          this.usuario = this.estudiante;
          this.title = 'Perfil Estudiante:';
        },
        (error) => {

        }
      );
    }
  }


}
