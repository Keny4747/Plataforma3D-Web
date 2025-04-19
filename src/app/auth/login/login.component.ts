import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string = '';
  password: string = '';
  error: string = '';
  backgroundImage: string = '';
  isLoadingImage: boolean = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.loadRandomImage();
  }

  loadRandomImage() {
    // Temas relacionados con educación y ciencia
    const topics = ['science', 'education', 'biology', 'technology', 'research'];
    const randomTopic = topics[Math.floor(Math.random() * topics.length)];

    // Reemplaza 'TU_ACCESS_KEY' con tu clave de acceso de Unsplash
    const unsplashUrl = `https://api.unsplash.com/photos/random?query=${randomTopic}&orientation=portrait`;

    this.http.get(unsplashUrl, {
      headers: {
        'Authorization': 'Client-ID tim4IL4-6wFZJRE9jmbuOwpEAituFFJapU0sfASWc-o'
      }
    }).subscribe({
      next: (response: any) => {
        this.backgroundImage = response.urls.regular;
        this.isLoadingImage = false;
      },
      error: (error) => {
        console.error('Error loading image:', error);
        // Imagen de respaldo en caso de error
        this.backgroundImage = 'https://concepto.de/wp-content/uploads/2018/10/sistema-nervioso-central1-e1539980373501.jpg';
        this.isLoadingImage = false;
      }
    });
  }

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
