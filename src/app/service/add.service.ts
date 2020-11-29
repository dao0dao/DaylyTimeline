import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Court } from 'src/environments/interfaces';

interface time {
  timeStart: string,
  timeEnd: string
}

interface AddReservation {
  isOpen: boolean,
  date: string,
  court?: Court,
  time?: time
}

@Injectable({
  providedIn: 'root'
})
export class AddService {

  addReservation$ = new Subject<AddReservation>()

  toggleAdd(isOpen: boolean, date: string = '', court: Court = '1', time: time = {timeStart : '', timeEnd : ''}) {
    this.addReservation$.next({ isOpen, date, court, time })
  }
  constructor() { }
}
