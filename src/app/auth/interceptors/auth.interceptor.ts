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
  constructor(private authService: AuthService) {

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.authService.isAuthenticated()) {
      const credentials = sessionStorage.getItem('credentials');
      const clonedRequest = request.clone({
        headers: new HttpHeaders({
          'Authorization': `Basic ${credentials}`,
          'Content-Type': 'application/json'
        }),
        withCredentials: true
      });

      return next.handle(clonedRequest).pipe(
        tap(
          event => console.log('HTTP response:', event),
          error => console.error('HTTP Error:', error)
        )
      );
    }
    return next.handle(request);
  }
}
