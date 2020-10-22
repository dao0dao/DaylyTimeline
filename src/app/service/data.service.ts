import { Injectable } from '@angular/core';
import { Reservation, court } from '../../environments/interfaces'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  checkReservation(court: court, rowStart: number, rowEnd: number, item?: Reservation) {
    let canChange: boolean[] = []
    this.reservation.map(
      res => {
        if (res.court === court && res.reservationId !== item.reservationId && (rowStart <= res.rowStart || rowStart >= res.rowEnd) && (rowEnd <= res.rowStart || rowStart >= res.rowEnd)) {
          canChange.push(true)
        } else if (res.court === court && res.reservationId === item.reservationId) {
          canChange.push(true)
        } else if (res.court === court) {
          canChange.push(false)
        }
      }
    )
    return canChange
  }

  deleteReservation(id: string) {
    this.reservation = this.reservation.filter(el => el.reservationId !== id)
  }

  reservation: Reservation[] = [
    {
      reservationId: '123',
      year: '2020',
      month: '10',
      day: '13',
      court: 1,
      timeStart: '00:00',
      timeEnd: '02:00',
      rowStart: 2,
      duration: 2,
      user: {
        firstName: 'Demid',
        lastName: 'Greshnikov',
        price: 25,
      }
    },
    {
      reservationId: '486',
      year: '2020',
      month: '10',
      day: '13',
      court: 2,
      timeStart: '00:00',
      timeEnd: '01:30',
      rowStart: 2,
      duration: 1,
      user: {
        firstName: 'Aleksandra',
        lastName: 'Greshnikova',
        price: 25
      }
    },
    {
      reservationId: 'gfds',
      year: '2020',
      month: '10',
      day: '13',
      court: 'dressroom',
      timeStart: '00:00',
      timeEnd: '04:00',
      rowStart: 3,
      duration: 4,
      user: {
        firstName: 'Dawid',
        lastName: 'Brożek',
        price: 70
      }
    },
  ]

  constructor() { }
}
