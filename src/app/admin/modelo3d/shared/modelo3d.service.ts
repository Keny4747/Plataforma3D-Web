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


  uploadFile(file: File, tipo: 'imagen' | 'modelos3D'): Observable<any> {
    const formData = new FormData();
    formData.append('files', file);
    formData.append('tipo', tipo);
    return this.http.post<any>(`${environment.apiBase}/api/s3/upload`, formData);
  }



  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiBase}/api/modelos/${id}`);
  }


}
