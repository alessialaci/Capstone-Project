import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Opera } from '../models/opera.interface';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private router: Router) { }

  // Per pulire il session storage
  clean(): void {
    window.sessionStorage.clear();
  }

  // Per salvare un utente nel session storage
  public saveUser(user: any): void {
    window.sessionStorage.removeItem('auth-user');
    window.sessionStorage.setItem('auth-user', JSON.stringify(user));
  }

  // Per recuperare il token dal session storage
  public getToken(): any {
   const authUser:any = window.sessionStorage.getItem('auth-user');
   const  parseAuthUser = JSON.parse(authUser);

   if(parseAuthUser) {
    return parseAuthUser.token;
   }

   return {};
  }

  // Per recuperare un utente dal session storage
  public getUser(): any {
    const user = window.sessionStorage.getItem('auth-user');

    if (user) {
      return JSON.parse(user);
    }

    return {};
  }

  // Per verificare se un utente è loggato
  public isLoggedIn() {
    const user = window.sessionStorage.getItem('auth-user');
    if (user) {
      return true;
    }
    this.router.createUrlTree(['/login']);
    return false;
  }

  // Per salvare un'opera parziale nel session storage
  public saveOpera(opera: Partial<Opera>): void {
    window.sessionStorage.removeItem('nuova-opera');
    window.sessionStorage.setItem('nuova-opera', JSON.stringify(opera));
  }

  // Per recuperare un'opera dal session storage
  public getOpera(): any {
    const opera = window.sessionStorage.getItem('nuova-opera');

    if (opera) {
      return JSON.parse(opera);
    }

    return {};
  }

  // Per rimuovere un'opera dal session storage
  public removeOperaSS() {
    window.sessionStorage.removeItem('nuova-opera');
  }

}
