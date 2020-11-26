import { Injectable } from '@angular/core';
import { Reservation, Court, User } from 'src/environments/interfaces'
import { ApiService } from './api.service';
import { HourService } from './hour.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  checkReservation(court: Court, rowStart: number, rowEnd: number, item?: Reservation): Array<boolean> {
    let canChange: boolean[] = []
    this.reservation.map(
      res => {
        if (res.court === court && res.reservationId !== item.reservationId && (rowStart < res.rowStart || rowStart >= res.rowEnd) && (rowEnd <= res.rowStart || rowEnd > res.rowEnd) && !(rowStart <= res.rowStart && rowEnd >= res.rowEnd)) {
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

  canAddReservation(reservation: Reservation): Array<boolean> {
    let courtSchedule = [...this.reservation.filter(el => el.court === reservation.court)]
    let canAdd: boolean[] = []
    if (courtSchedule.length === 10) {
      canAdd.push(false)
    }
    else if (courtSchedule.length !== 0) {
      courtSchedule.map(
        court => {
          if ((reservation.rowStart < court.rowStart || reservation.rowStart >= court.rowEnd) && (reservation.rowEnd <= court.rowStart || reservation.rowEnd > court.rowEnd) && !(reservation.rowStart <= court.rowStart && reservation.rowEnd >= court.rowEnd)) {
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

  addReservation(reservation: Reservation) {
    this.reservation.push(reservation)
  }

  deleteReservation(reservation: Reservation) {
    this.apiService.deleteReservation(reservation).subscribe(
      () => {
        this.reservation = this.reservation.filter(el => el.reservationId !== reservation.reservationId)
      }
    )
  }

  changeReservation(court: Court, newRowStart: number, newRowEnd: number, reservation: Reservation, duration: number): void | false {
    if (!this.checkReservation(court, newRowStart, newRowEnd, reservation).includes(false)) {
      let timeStart = this.hourService.findHour(newRowStart)
      let timeEnd = this.hourService.findHour(newRowEnd)

      this.apiService.dropReservation(reservation.reservationId, court, newRowStart, newRowEnd, timeStart, timeEnd, duration, reservation).subscribe(
        (res) => {
          if (res) {
            reservation.court = court
            reservation.rowStart = newRowStart
            reservation.rowEnd = newRowEnd
            reservation.duration = duration
            reservation.timeStart = timeStart
            reservation.timeEnd = timeEnd
          }
        },
        () => { return false }
      )
    } else {
      return false
    }
  }

  getByDate(year: string, month: string, day: string) {
    this.apiService.getReservationByDate(year, month, day).subscribe(
      (res: Reservation[]) => {
        if (res === null) {
          this.reservation = []
        } else {
          this.reservation = res
        }
      },
    )
  }

  
  reservation: Reservation[] = []


  constructor(private hourService: HourService, private apiService: ApiService) { }
}