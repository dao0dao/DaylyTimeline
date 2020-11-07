import { Injectable } from '@angular/core';
import { Reservation, Court, User } from '../../environments/interfaces'
import { HourService } from './hour.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  checkReservation(court: Court, rowStart: number, rowEnd: number, item?: Reservation): Array<boolean> {
    let canChange: boolean[] = []
    this.reservation.map(
      res => {
        if (res.court === court && res.reservationId !== item.reservationId && (rowStart < res.rowStart || rowStart >= res.rowEnd) && (rowEnd <= res.rowStart || rowEnd > res.rowEnd)) {
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

  canAddReservation(court: Court, rowStart: number, rowEnd: number): Array<boolean> {
    let courtSchedule = [...this.reservation.filter(el => el.court === court)]
    let canAdd: boolean[] = []
    if (courtSchedule.length !== 0) {
      courtSchedule.map(
        court => {
          if ((rowStart < court.rowStart || rowStart >= court.rowEnd) && (rowEnd < court.rowEnd || rowEnd > court.rowEnd)) {
            canAdd.push(true)
          } else {
            canAdd.push(false)
          }
        }
      )
    } else {
      canAdd.push(true)
    }
    return canAdd
  }

  deleteReservation(id: string) {
    this.reservation = this.reservation.filter(el => el.reservationId !== id)
  }

  changeReservation(court: Court, newRowStart: number, newRowEnd: number, reservation: Reservation, duration: number): void | false {
    if (!this.checkReservation(court, newRowStart, newRowEnd, reservation).includes(false)) {
      reservation.court = court
      reservation.rowStart = newRowStart
      reservation.rowEnd = newRowEnd
      reservation.duration = duration
      reservation.timeStart = this.hourService.findHour(newRowStart)
      reservation.timeEnd = this.hourService.findHour(newRowEnd)
    } else {
      return false
    }
  }

  returnByDate(year: string, month: string, day: string) {
    this.reservation = this.API.filter(el => el.year === year && el.month === month && el.day === day)
  }

  findUserById(id: string): User {
    return this.userApi.find(user => user.userId === id)
  }

  userApi: User[] = [
    {
      userId: '123',
      firstName: 'Demid',
      lastName: 'Greshnikov',
    },
    {
      userId: '486',
      firstName: 'Aleksandra',
      lastName: 'Greshnikova'
    },
    {
      userId: 'gfds',
      firstName: 'Dawid',
      lastName: 'Brożek',
    }
  ]

  API: Reservation[] = [
    {
      reservationId: '123',
      year: '2020',
      month: '11',
      day: '2',
      court: 1,
      timeStart: '00:00',
      timeEnd: '02:00',
      rowStart: 2,
      rowEnd: 6,
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
      month: '11',
      day: '2',
      court: 2,
      timeStart: '00:00',
      timeEnd: '00:30',
      rowStart: 2,
      rowEnd: 3,
      duration: 0.5,
      user: {
        firstName: 'Aleksandra',
        lastName: 'Greshnikova',
        price: 25
      }
    },
    {
      reservationId: 'gfds',
      year: '2020',
      month: '11',
      day: '2',
      court: 'dressroom',
      timeStart: '00:00',
      timeEnd: '04:00',
      rowStart: 3,
      rowEnd: 11,
      duration: 4,
      user: {
        firstName: 'Dawid',
        lastName: 'Brożek',
        price: 70
      }
    },
  ]

  // reservation: Reservation[] = []
  reservation: Reservation[] = this.API


  constructor(private hourService: HourService) { }
}
