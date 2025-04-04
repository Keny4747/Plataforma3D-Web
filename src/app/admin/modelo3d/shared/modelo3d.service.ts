import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Modelo3D } from './modelo3d.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Modelo3dService {

  constructor(private http:HttpClient) { }
  getAll():Observable<Modelo3D[]>{
    return this.http.get<Modelo3D[]>(`${environment.apiBase}/api/modelos`);
  }

  create(modelo: Modelo3D): Observable<Modelo3D> {
    return this.http.post<Modelo3D>(`${environment.apiBase}/api/modelos`, modelo);
  }


  get(id: number): Observable<Modelo3D> {
    return this.http.get<Modelo3D>(`${environment.apiBase}/api/modelos/detalle/${id}`);
  }


  //TODO:endpoints para subir modelo 3d
  uploadModel(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(`${environment.apiBase}/api/s3/upload`, formData);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiBase}/api/modelos/${id}`);
  }


}
