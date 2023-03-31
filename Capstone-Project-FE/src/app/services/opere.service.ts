import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { StorageService } from '../auth/storage.service';
import { TipoOpera } from '../enums/tipo-opera.enum';
import { Opera } from '../models/opera.interface';

@Injectable({
  providedIn: 'root'
})
export class OpereService {

  constructor(private http: HttpClient, private ss: StorageService) { }

  getOpere(): Observable<Opera[]> {
    return this.http.get<Opera[]>('http://localhost:8080/app/opere');
  }

  getOperaById(id: number): Observable<Opera> {
    return this.http.get<Opera>(`http://localhost:8080/app/opere/${id}`);
  }

  getOpereByTipo(tipo: TipoOpera): Observable<Opera[]> {
    const params = new HttpParams().set('tipo', tipo);
    return this.http.get<Opera[]>(`http://localhost:8080/app/opere/cerca`, { params });
  }

  deleteOpera(id: number): Observable<Object> {
    return this.http.delete(`http://localhost:8080/app/opere/${id}`);
  }

  addOpera(opera: any): Observable<Object> {
    return this.http.post('http://localhost:8080/app/opere', opera).pipe(
      tap((operaCompleta) => {
        this.ss.saveOpera(operaCompleta);
      })
    );
  }

  updateOpera(opera: any, id: number): Observable<Object> {
    return this.http.put(`http://localhost:8080/app/opere/${id}`, opera);
  }

}
