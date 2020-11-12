import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Reservation, User } from '../../environments/interfaces'

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  public reservationDelete$ = new Subject<Reservation | false>()
  public userDelete$ = new Subject<User | false>()
  public alertToggle$ = new Subject<boolean>()

  confirmDelete(reservation: Reservation | false) {
    this.reservationDelete$.next(reservation)
  }

  userData(user: User | false) {
    this.userDelete$.next(user)
  }

  alertToggle(open: boolean) {
    this.alertToggle$.next(open)
  }

  constructor() { }
}
