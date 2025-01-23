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

    return this.http.get(`${this.baseUrl}/login`, { headers, observe: 'response' })
      .pipe(
        map(response => {
          if (response.status === 200) {
            // Guardamos las credenciales en sessionStorage
            sessionStorage.setItem('credentials', btoa(username + ':' + password));
            return true;
          }
          return false;
        })
      );
  }

  logout() {
    sessionStorage.removeItem('credentials');
  }

  isAuthenticated(): boolean {
    return sessionStorage.getItem('credentials') !== null;
  }

  getAuthorizationHeader(): HttpHeaders {
    const credentials = sessionStorage.getItem('credentials');
    return new HttpHeaders({
      'Authorization': `Basic ${credentials}`
    });
  }
}
