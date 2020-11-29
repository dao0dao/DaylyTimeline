import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class InterceptorService implements HttpInterceptor {

  handleError() {
    this.authService.logOut()
    this.route.navigate(['/'])
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    const cloneReq = req.clone({
      setParams: {
        auth: this.authService.token
      }
    })
    return next.handle(cloneReq).pipe(
      catchError((err : HttpErrorResponse) => {
        if(err.status === 401){
          this.handleError()
        }
        return throwError(err)
      })
    )
  }


  constructor(private authService: AuthService, private route: Router) { }
}
