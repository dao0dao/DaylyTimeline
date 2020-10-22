import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Reservation } from '../../environments/interfaces'

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  isOpen$ = new Subject<boolean>()
  data$ = new Subject<Reservation | null>()
  cancleDrag$ = new Subject<true>()

  openInfo(toggler: boolean) {
    this.isOpen$.next(toggler)
  }

  moveData(reservation: Reservation | null) {
    this.data$.next(reservation)
  }

  stopDrag() {
    this.cancleDrag$.next(true)
  }

  constructor() { }
}
