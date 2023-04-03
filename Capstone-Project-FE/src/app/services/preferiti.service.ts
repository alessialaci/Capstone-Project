import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Preferito } from '../models/preferito.interface';
import { Utente } from '../models/utente.interface';

@Injectable({
  providedIn: 'root'
})
export class PreferitiService {

  constructor(private http: HttpClient) { }

  getPreferiti(): Observable<Preferito[]> {
    return this.http.get<Preferito[]>('http://localhost:8080/app/preferiti');
  }

  getPreferitoById(id: number): Observable<Preferito> {
    return this.http.get<Preferito>(`http://localhost:8080/app/preferiti/${id}`);
  }

  getPreferitiByUtenteId(id: number): Observable<Preferito[]> {
    const params = new HttpParams().set('utente', id);
    return this.http.get<Preferito[]>(`http://localhost:8080/app/preferiti/cerca`, { params });
  }

  deletePreferito(id: number): Observable<Object> {
    return this.http.delete(`http://localhost:8080/app/preferiti/${id}`);
  }

  addPreferito(preferito: Partial<Preferito>): Observable<Object> {
    return this.http.post('http://localhost:8080/app/preferiti', preferito);
  }

  updatePreferito(preferito: Preferito, id: number): Observable<Object> {
    return this.http.put(`http://localhost:8080/app/offerte/${id}`, preferito);
  }

}
