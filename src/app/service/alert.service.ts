import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Reservation } from '../../environments/interfaces'

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  public userDelete$ = new Subject<Reservation | false>()
  public alertToggle$ = new Subject<boolean>()

  confirmDelete(reservation: Reservation | false) {
    this.userDelete$.next(reservation)
  }

  alertToggle(open: boolean) {
    this.alertToggle$.next(open)
  }

  constructor() { }
}
