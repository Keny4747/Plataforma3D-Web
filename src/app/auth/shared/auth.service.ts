import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<boolean> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(username + ':' + password)
    });

    return this.http.get<{ username: string, fullName: string }>(`${this.baseUrl}/login`, { headers, observe: 'response' })
      .pipe(
        map(response => {
          if (response.status === 200 && response.body) {
            // Guardamos las credenciales en sessionStorage
            sessionStorage.setItem('credentials', btoa(username + ':' + password));
            // Guardamos el nombre de usuario y el nombre completo en sessionStorage
            sessionStorage.setItem('username', response.body.username);
            sessionStorage.setItem('fullName', response.body.fullName);
            return true;
          }
          return false;
        })
      );
  }

  logout() {
    sessionStorage.removeItem('credentials');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('fullName');
  }

  isAuthenticated(): boolean {
    return sessionStorage.getItem('credentials') !== null;
  }

  getUsername(): string | null {
    return sessionStorage.getItem('username');
  }

  getFullName(): string | null {
    return sessionStorage.getItem('fullName'); // Método para obtener el nombre completo
  }

  getAuthorizationHeader(): HttpHeaders {
    const credentials = sessionStorage.getItem('credentials');
    return new HttpHeaders({
      'Authorization': `Basic ${credentials}`
    });
  }
}
