import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ordine } from '../models/ordine.interface';
import { Utente } from '../models/utente.interface';

@Injectable({
  providedIn: 'root'
})
export class OrdiniService {

  constructor(private http: HttpClient) { }

  getOrdini(): Observable<Ordine[]> {
    return this.http.get<Ordine[]>('http://localhost:8080/app/ordini');
  }

  getOrdineById(id: number): Observable<Ordine> {
    return this.http.get<Ordine>(`http://localhost:8080/app/ordini/${id}`);
  }

  getOrdiniByUtente(utente: Utente): Observable<Ordine[]> {
    const params = new HttpParams().set('utente', utente.id.toString());
    return this.http.get<Ordine[]>(`http://localhost:8080/app/ordini/cerca`, { params });
  }

  addOrdine(ordine: Partial<Ordine>): Observable<Object> {
    return this.http.post('http://localhost:8080/app/ordini', ordine);
  }

  updateOrdine(ordine: Ordine): Observable<Object> {
    return this.http.put(`http://localhost:8080/app/ordini/${ordine.id}`, ordine);
  }

  deleteOrdine(id: number): Observable<Object> {
    return this.http.delete(`http://localhost:8080/app/ordini/${id}`);
  }

}
