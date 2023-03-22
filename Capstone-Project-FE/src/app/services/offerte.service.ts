import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Offerta } from '../models/offerta.interface';
import { Opera } from '../models/opera.interface';

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

  getOfferteByOperaId(opera: Opera): Observable<Offerta[]> {
    const params = new HttpParams().set('opera', opera.id.toString());
    return this.http.get<Offerta[]>(`http://localhost:8080/app/offerte/cerca`, { params });
  }

  deleteOfferta(id: number): Observable<Object> {
    return this.http.delete(`http://localhost:8080/app/offerte/${id}`);
  }

  addOfferta(offerta: Partial<Offerta>): Observable<Object> {
    return this.http.post('http://localhost:8080/app/offerte', offerta);
  }

  updateOfferta(offerta: Offerta, id: number): Observable<Object> {
    return this.http.put(`http://localhost:8080/app/offerte/${id}`, offerta);
  }

}
