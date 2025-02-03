import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080';



  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string): Observable<boolean> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(username + ':' + password)
    });

    return this.http.get<{ username: string, fullName: string, id: string }>(
      `${this.baseUrl}/login`,
      { headers, observe: 'response' }
    ).pipe(
      map(response => {
        if (response.status === 200 && response.body) {
          // Almacenar datos en sessionStorage
          sessionStorage.setItem('credentials', btoa(username + ':' + password));
          sessionStorage.setItem('username', response.body.username);
          sessionStorage.setItem('fullName', response.body.fullName || '');
          sessionStorage.setItem('id', response.body.id || '');


          return true;
        }
        return false;
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Error durante el login:', error);
        return of(false);
      })
    );
  }
  isAuthenticated(): boolean {
    return sessionStorage.getItem('credentials') !== null;
  }

  getUsername(): string | null {
    return sessionStorage.getItem('username');
  }

  getFullName(): string | null {
    return sessionStorage.getItem('fullName');
  }
  getId(): string | null {
    return sessionStorage.getItem('id');
  }

  getAuthorizationHeader(): HttpHeaders {
    const credentials = sessionStorage.getItem('credentials');
    return new HttpHeaders({
      'Authorization': `Basic ${credentials}`
    });
  }


  logout() {
    // Eliminar las credenciales del sessionStorage
    sessionStorage.removeItem('credentials');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('fullName');

    // Redirigir al usuario a la página de login
    this.router.navigate(['/login']);
  }


}
