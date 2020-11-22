import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Reservation } from '../../environments/interfaces'

@Injectable({
  providedIn: 'root'
})
export class EditServiceService {

  editIsOpen$ = new Subject<boolean>()
  editData$ = new Subject<Reservation>()

  openEdit(isOpen: boolean) {
    this.editIsOpen$.next(isOpen)
  }

  editData(reservation: Reservation) {
    console.log(reservation);
    this.editData$.next(reservation)
  }

  constructor() { }
}
