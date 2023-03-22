import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Notifica } from '../models/notifica.interface';
import { Utente } from '../models/utente.interface';

@Injectable({
  providedIn: 'root'
})
export class NotificheService {

  constructor(private http: HttpClient) { }

  getOfferte(): Observable<Notifica[]> {
    return this.http.get<Notifica[]>('http://localhost:8080/app/notifiche');
  }

  getNotificaById(id: number): Observable<Notifica> {
    return this.http.get<Notifica>(`http://localhost:8080/app/notifiche/${id}`);
  }

  getNotificheByUtente(utente: Utente): Observable<Notifica[]> {
    const params = new HttpParams().set('utente', utente.id.toString());
    return this.http.get<Notifica[]>(`http://localhost:8080/app/notifiche/cerca`, { params });
  }

  deleteNotifica(id: number): Observable<Object> {
    return this.http.delete(`http://localhost:8080/app/notifiche/${id}`);
  }

  addNotifica(notifica: Partial<Notifica>): Observable<Object> {
    return this.http.post('http://localhost:8080/app/notifiche', notifica);
  }

  updateNotifica(notifica: Partial<Notifica>): Observable<Object> {
    return this.http.put(`http://localhost:8080/app/notifiche/${notifica.id}`, notifica);
  }

}
