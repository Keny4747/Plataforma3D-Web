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

}
