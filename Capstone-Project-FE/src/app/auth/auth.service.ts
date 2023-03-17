import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  login(data: {username: string, password: string}): Observable<any> {
    return this.http.post(
      'http://localhost:8080/auth/login',
      data,
      this.httpOptions
    );
  }

  register(data: {nome: string, cognome: string, username: string, email: string, password: string }): Observable<any> {
    return this.http.post(
      'http://localhost:8080/app/utenti',
      data,
      this.httpOptions
    );
  }

  logout(): Observable<any> {
    return this.http.post(
      'http://localhost:8080/auth/logout',
      { },
      this.httpOptions
    );
  }

}
