import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class JWTInterceptor implements HttpInterceptor {
    
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    var token = currentUser && currentUser.token ? currentUser.token : ''

    req = req.clone({
      setHeaders: {
        Authorization: token,
        'Content-Type': 'application/json'
      }
    });
    return next.handle(req);

  }
  
}