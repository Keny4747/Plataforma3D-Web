import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Estudiante } from './estudiante.model';
import { Docente } from './docente.model';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http:HttpClient) { }

//metodos para el crud de estudiantes
  getEstudiantes(): Observable<Estudiante[]> {
    return this.http.get<Estudiante[]>(`${environment.apiBase}/estudiante/list`);
  }


  createEstudiante(estudiante: Estudiante): Observable<Estudiante> {
    return this.http.post<Estudiante>(`${environment.apiBase}/estudiante/new`, estudiante);
  }


  getEstudianteById(id: number): Observable<Estudiante> {
    return this.http.get<Estudiante>(`${environment.apiBase}/estudiante/${id}`);
  }


  updateEstudiante(id:number,estudiante: Estudiante): Observable<Estudiante> {

    return this.http.put<Estudiante>(`${environment.apiBase}/estudiante/${id}`, estudiante);
  }


  deleteEstudiante(id: number): Observable<Estudiante> {
    return this.http.delete<Estudiante>(`${environment.apiBase}/estudiante/${id}`);
  }

  //metodos para el crud de docentes

  getDocenteById(id: string): Observable<Docente> {
    return this.http.get<Docente>(`${environment.apiBase}/docente/${id}`);
  }

}
