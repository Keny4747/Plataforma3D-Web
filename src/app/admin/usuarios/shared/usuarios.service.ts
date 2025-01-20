import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Estudiante } from './estudiante.model';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http:HttpClient) { }


  getEstudiantes(): Observable<Estudiante[]> {
    return this.http.get<Estudiante[]>(`${environment.apiBase}/estudiante/list`);
  }

}
