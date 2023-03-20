import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Foto } from '../models/foto.interface';

@Injectable({
  providedIn: 'root'
})
export class FotoService {

  constructor(private http: HttpClient) { }

  getFoto(): Observable<Foto[]> {
    return this.http.get<Foto[]>('http://localhost:8080/app/foto');
  }

  getFotoById(id: number): Observable<Foto> {
    return this.http.get<Foto>(`http://localhost:8080/app/foto/${id}`);
  }

  deletFoto(id: number): Observable<Object> {
    return this.http.delete(`http://localhost:8080/app/foto/${id}`);
  }

  addFoto(foto: Partial<Foto>): Observable<Object> {
    return this.http.post('http://localhost:8080/app/foto', foto);
  }

  updateFoto(foto: Foto, id: number): Observable<Object> {
    return this.http.put(`http://localhost:8080/app/foto/${id}`, foto);
  }

}
