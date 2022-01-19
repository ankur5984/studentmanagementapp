import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class HttpIntercepterBasicAuthService implements HttpInterceptor{


  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let user = 'admin';
    let pass = 'admin123'
    let basicAuthHeaderString = 'Basic ' + window.btoa(user + ":" + pass); 
   // let headers = new HttpHeaders({Authorization:basicAuthHeaderString});

    req = req.clone({
      setHeaders:{
        Authorization:basicAuthHeaderString
      }
    })

    return next.handle(req);

  }
}
