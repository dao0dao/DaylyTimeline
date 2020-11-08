import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { FbSigInResponse, LoginUser } from 'src/environments/interfaces';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators'

import * as moment from 'moment'
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private setToken(response: FbSigInResponse | null) {
    if (response) {
      const expDate = moment().add({
        seconds: parseInt(response.expiresIn)
      }).toString()
      localStorage.setItem('idToken', response.idToken);
      localStorage.setItem('expiresIn', expDate)
    } else {
      localStorage.clear()
    }
  }

  get token(): string {
    const expDate = new Date(localStorage.getItem('expiresIn'))
    if (new Date() > expDate) {
      this.logOut()
      return null
    } else {
      return localStorage.getItem('idToken')
    }
  }

  private handleError(error: HttpErrorResponse) {
    const { message } = error.error.error;
    switch (message) {
      case 'EMAIL_NOT_FOUND':
        this.errorService.toggleError(true, 'Nieprawidło email/hasło')
        break;
      case 'INVALID_PASSWORD':
        this.errorService.toggleError(true, 'Nieprawidło email/hasło')
        break;
      case 'USER_DISABLED':
        this.errorService.toggleError(true, 'Użytkownik nie istniej')
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        this.errorService.toggleError(true, 'Serwer przeciążony, spróbuj późnije')
        break;
    }
    return throwError(error)
  }

  signIn(loginUser: LoginUser): Observable<FbSigInResponse> {
    return this.http.post<FbSigInResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.fbApiKey}`, loginUser).pipe(
      tap((res) => { this.setToken(res) }),
      catchError(err => this.handleError(err))
    )
  }

  logOut() {
    this.setToken(null)
  }

  isAuth(): boolean {
    return !!this.token
  }

  constructor(private http: HttpClient, private errorService: ErrorService) { }
}
