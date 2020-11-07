import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

interface AddReservation {
  isOpen: boolean,
  date: string
}

@Injectable({
  providedIn: 'root'
})
export class AddService {

  addReservation$ = new Subject<AddReservation>()

  toggleAdd(isOpen: boolean, date: string = null) {
    this.addReservation$.next({ isOpen, date })
  }
  constructor() { }
}
