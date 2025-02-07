import { Component } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  error: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    this.authService.login(this.username, this.password)
      .subscribe({
        next: (success) => {
          if (success) {
            this.router.navigate(['/']);
          } else {
            this.error = 'Credenciales inválidas';
          }
        },
        error: (error) => {
          this.error = 'Error al iniciar sesión';
        }
      });
  }
}
