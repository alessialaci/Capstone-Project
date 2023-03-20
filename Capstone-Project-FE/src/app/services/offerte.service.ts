import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Offerta } from '../models/offerta.interface';

@Injectable({
  providedIn: 'root'
})
export class OfferteService {

  constructor(private http: HttpClient) { }

  getOfferte(): Observable<Offerta[]> {
    return this.http.get<Offerta[]>('http://localhost:8080/app/offerte');
  }

  getOffertaById(id: number): Observable<Offerta> {
    return this.http.get<Offerta>(`http://localhost:8080/app/offerte/${id}`);
  }

  deletOfferta(id: number): Observable<Object> {
    return this.http.delete(`http://localhost:8080/app/offerte/${id}`);
  }

  addOfferta(offerta: Partial<Offerta>): Observable<Object> {
    return this.http.post('http://localhost:8080/app/offerte', offerta);
  }

  updateOfferta(offerta: Offerta, id: number): Observable<Object> {
    return this.http.put(`http://localhost:8080/app/offerte/${id}`, offerta);
  }

}
