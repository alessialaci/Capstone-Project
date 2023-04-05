import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Foto } from '../models/foto.interface';
import { Opera } from '../models/opera.interface';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*'
  })
};

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

  getFotoByOperaId(opera: Opera): Observable<Foto[]> {
    const params = new HttpParams().set('opera', opera.id.toString());
    return this.http.get<Foto[]>(`http://localhost:8080/app/foto/cerca`, { params });
  }

  addFoto(foto: Partial<Foto>): Observable<Object> {
    return this.http.post('http://localhost:8080/app/foto', foto);
  }

  // Per salvare immagini su Cloudinary
  uploadImage(vals: any): Observable<any> {
    let data = vals;
    return this.http.post('https://api.cloudinary.com/v1_1/dwe3fc2iq/image/upload', data, httpOptions);
  }

  // Per salvare foto di tipo Foto sul DB
  updateFoto(foto: Foto, id: number): Observable<Object> {
    return this.http.put(`http://localhost:8080/app/foto/${id}`, foto);
  }

  deleteFoto(id: number): Observable<Object> {
    return this.http.delete(`http://localhost:8080/app/foto/${id}`);
  }

}
