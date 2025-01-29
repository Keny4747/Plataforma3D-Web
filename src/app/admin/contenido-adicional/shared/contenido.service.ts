import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from './book.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContenidoService {

  constructor(private http:HttpClient) { }

  get(id:number):Observable<Book>{
    return this.http.get<Book>(`${environment.apiBase}/api/books/${id}`);
  }

  getAll():Observable<Book[]>{
    return this.http.get<Book[]>(`${environment.apiBase}/api/books`);
  }

  create(book:Book):Observable<Book>{
    return this.http.post<Book>(`${environment.apiBase}/api/books`,book);
  }
  update(book: Book): Observable<Book> {
    return this.http.put<Book>(`${environment.apiBase}/api/books/${book.id}`, book);
  }


  delete(id:number):Observable<any>{
    return this.http.delete(`${environment.apiBase}/api/books/${id}`);
  }



  //endpoints para subir archivos
  uploadFiles(files: File[]): Observable<any> {
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append('files', file);
    });
    //mostrar el contenido del formData en la consola
    console.log(formData);

    return this.http.post(`${environment.apiBase}/api/media/upload`, formData);
  }

  downloadFile(filename: string): Observable<Blob> {
    return this.http.get(`${environment.apiBase}/api/media/${filename}`, { responseType: 'blob' });
  }
}
