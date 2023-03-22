import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authUser: any = window.sessionStorage.getItem('auth-user');

    if(request.headers.has('Access-Control-Allow-Origin'))  {
      if (request.headers.get('Access-Control-Allow-Origin') === '*') {
        return next.handle(request.clone({ headers: request.headers.delete('Authorization') && request.headers.delete('Access-Control-Allow-Origin') }));
      }
    }

    if(authUser) {
      const  parseAuthUser = JSON.parse(authUser);
      const token = parseAuthUser.token;

      if(token){
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          },
          withCredentials: false,
        });
      } else {
        console.log("errore1");
      }
    } else {
      console.log("errore2");
    }

    return next.handle(request);
  }
}

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
];
