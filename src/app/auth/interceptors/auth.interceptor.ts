import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../shared/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Verifica si la solicitud es multipart (FormData)
    const isMultipartRequest = request.body instanceof FormData;

    if (this.authService.isAuthenticated()) {
      const credentials = sessionStorage.getItem('credentials');

      // Clona la solicitud y agrega los headers necesarios
      const clonedRequest = request.clone({
        headers: new HttpHeaders({
          'Authorization': `Basic ${credentials}`,
          // No agregues 'Content-Type' si es una solicitud multipart
          ...(isMultipartRequest ? {} : { 'Content-Type': 'application/json' })
        }),
        withCredentials: true
      });

      return next.handle(clonedRequest);
    }

    return next.handle(request);
  }
}
