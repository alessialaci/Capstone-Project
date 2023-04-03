import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Utente } from '../models/utente.interface';
import { Opera } from '../models/opera.interface';

@Injectable({
  providedIn: 'root'
})
export class UtentiService {

  constructor(private http: HttpClient) { }

  getUtenti(): Observable<Utente[]> {
    return this.http.get<Utente[]>('http://localhost:8080/app/utenti');
  }

  getUtenteById(id: number): Observable<Utente> {
    return this.http.get<Utente>(`http://localhost:8080/app/utenti/${id}`);
  }

  deleteUtente(id: number): Observable<Object> {
    return this.http.delete(`http://localhost:8080/app/utenti/${id}`);
  }

  addUtente(utente: Utente): Observable<Object> {
    return this.http.post('http://localhost:8080/app/utenti', utente);
  }

  updateUtente(utente: Partial<Utente>): Observable<Object> {
    return this.http.put(`http://localhost:8080/app/utenti/${utente.id}`, utente);
  }

  updatePreferiti(utente: Partial<Utente>, preferiti: Opera[]): Observable<Partial<Utente>> {
    utente.preferiti = preferiti;
    return this.http.put(`http://localhost:8080/app/utenti/${utente.id}`, utente);
  }

}
