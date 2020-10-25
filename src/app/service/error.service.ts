import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

interface Error {
  isOpen: boolean,
  title: string
}

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  error$ = new Subject<Error>()

  toggleError(isOpen: boolean, title: string) {
    this.error$.next({
      isOpen,
      title
    })
  }

  constructor() { }
}
