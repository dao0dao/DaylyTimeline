import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable({ providedIn: 'root' })
export class InterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    const cloneReq = req.clone({
      setParams: {
        auth: this.authService.token
      }
    })
    return next.handle(cloneReq)
  }


  constructor(private authService: AuthService) { }
}
