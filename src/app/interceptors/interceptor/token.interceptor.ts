import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { get, set, remove } from '../../services/storage';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  token$: any;

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // let authservice = this.injector.get(AuthService)
    const token = get('token');
    token.then(val => this.token$ = val.token);
    // const tokenValue = this.token$['token'];
    // console.log(this.token$);

    // if (req.url.indexOf('/login') !== -1 && req.method === 'POST') {
    //   // console.log(req)
    //   // console.log(typeof req.url)
    //   return next.handle(req);
    // }

    // if (req.url.indexOf('/register') !== -1 && req.method === 'POST') {
    //   // console.log(req)
    //   // console.log(typeof req.url)
    //   return next.handle(req);
    // }

    if (this.token$) {
      req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + this.token$) });
    }

    if (!req.headers.has('Content-Type')) {
      req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
  }
    req = req.clone({ headers: req.headers.set('Accept', 'application/json') });
    return next.handle(req);

}
}
