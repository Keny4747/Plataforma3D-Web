import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../shared/usuarios.service';
import { Docente } from '../shared/docente.model';
import { AuthService } from 'src/app/auth/shared/auth.service';

@Component({
  selector: 'app-docente-detail',
  templateUrl: './docente-detail.component.html',
  styleUrls: ['./docente-detail.component.scss']
})
export class DocenteDetailComponent implements OnInit {

  usuario: Docente | null = null;

  constructor(private authService: AuthService, private userService: UsuariosService) { }

  ngOnInit(): void {

    const userId = this.authService.getId();


    if (userId) {
      this.userService.getDocenteById(userId).subscribe(
        (data) => {
          this.usuario = data;

        },
        (error) => {

        }
      );
    } else {
      console.error('No se ha encontrado el ID del usuario');
    }
  }

}
