import { Injectable } from '@angular/core';
import { Opera } from '../models/opera.interface';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  clean(): void {
    window.sessionStorage.clear();
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem('auth-user');
    window.sessionStorage.setItem('auth-user', JSON.stringify(user));
  }

  public getToken(): any {
   const authUser:any = window.sessionStorage.getItem('auth-user');
   const  parseAuthUser = JSON.parse(authUser);

   if(parseAuthUser) {
    return parseAuthUser.token;
   }

   return {};
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem('auth-user');

    if (user) {
      return JSON.parse(user);
    }

    return {};
  }

  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem('auth-user');

    if (user) {
      return true;
    }

    return false;
  }

  public saveOpera(opera: Partial<Opera>): void {
    window.sessionStorage.removeItem('nuova-opera');
    window.sessionStorage.setItem('nuova-opera', JSON.stringify(opera));
  }

  public getOpera(): any {
    const opera = window.sessionStorage.getItem('nuova-opera');

    if (opera) {
      return JSON.parse(opera);
    }

    return {};
  }

  public getIdOpera(): any {
    const nuovaOpera: any = window.sessionStorage.getItem('nuova-opera');
    const parseNuovaOpera = JSON.parse(nuovaOpera);
    console.log(parseNuovaOpera);


    if(parseNuovaOpera) {
     return parseNuovaOpera.id;
    }

    return {};
  }

  public removeOperaSS() {
    window.sessionStorage.removeItem('nuova-opera');
  }

}
