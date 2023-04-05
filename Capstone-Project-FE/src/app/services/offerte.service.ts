import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
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
    const params = new HttpParams().set('opera', opera.id);
    return this.http.get<Offerta[]>(`http://localhost:8080/app/offerte/cerca`, { params });
  }

  // Per recuperare l'ultima offerta effettuata da un utente ad un'opera specifica
  getUltimaOfferta(opera: Opera): Observable<Offerta> {
    const params = new HttpParams().set('opera', opera.id).set('_sort', 'data').set('_order', 'desc').set('_limit', '1');
    return this.http.get<Offerta[]>('http://localhost:8080/app/offerte/cerca', { params }).pipe(
      map(offerte => offerte[offerte.length - 1])
    );
  }

  addOfferta(offerta: Partial<Offerta>): Observable<Object> {
    return this.http.post('http://localhost:8080/app/offerte', offerta);
  }

  updateOfferta(offerta: Offerta, id: number): Observable<Object> {
    return this.http.put(`http://localhost:8080/app/offerte/${id}`, offerta);
  }

  deleteOfferta(id: number): Observable<Object> {
    return this.http.delete(`http://localhost:8080/app/offerte/${id}`);
  }

}
