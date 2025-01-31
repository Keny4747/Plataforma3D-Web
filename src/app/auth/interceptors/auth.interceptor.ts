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

    const isMultipartRequest = request.body instanceof FormData;

    if (this.authService.isAuthenticated()) {
      const credentials = sessionStorage.getItem('credentials');


      const clonedRequest = request.clone({
        headers: new HttpHeaders({
          'Authorization': `Basic ${credentials}`,

          ...(isMultipartRequest ? {} : { 'Content-Type': 'application/json' })
        }),
        withCredentials: true
      });

      return next.handle(clonedRequest);
    }

    return next.handle(request);
  }
}
