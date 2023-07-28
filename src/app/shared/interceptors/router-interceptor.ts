import { AuthService } from '@auth/auth.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
@Injectable()
export class RouterInterceptor implements HttpInterceptor {
  constructor(private authSvc: AuthService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    if (req.url.includes('user') || req.url.includes('company') || req.url.includes('logout')
    || req.url.includes('employee') || req.url.includes('vehicle') || req.url.includes('clients')
    || req.url.includes('route') || req.url.includes('guide') || req.url.includes('trailer')) {
      console.log('fola');
      const userValue = this.authSvc.userValue;
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${userValue.token}`,
        },
        //setParams: { id: `${33}` }
      });
      return next.handle(authReq);
    }
    return next.handle(req);
  }
}
