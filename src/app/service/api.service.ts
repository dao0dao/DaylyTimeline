import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Court, FbPutResponse, Reservation, User } from 'src/environments/interfaces';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  getReservationByDate(year: string, month: string, day: string): Observable<Reservation[]> {
    return this.http.get(`${environment.dbUrl}schedule/${year}/${month}/${day}.json`).pipe(
      map(
        (response: { [key: string]: Reservation }) => {
          if (response !== null) {
            return Object.keys(response).map(
              id => {
                let reservation: Reservation
                return reservation = {
                  reservationId: id,
                  year: response[id].year,
                  month: response[id].month,
                  day: response[id].day,
                  court: response[id].court,
                  timeStart: response[id].timeStart,
                  timeEnd: response[id].timeEnd,
                  rowStart: response[id].rowStart,
                  rowEnd: response[id].rowEnd,
                  duration: response[id].duration,
                  user: response[id].user
                }
              }
            )
          } else {
            return null
          }
        }
      )
    )
  }

  addReservation(reservation: Reservation): Observable<FbPutResponse> {
    return this.http.post<FbPutResponse>(`${environment.dbUrl}schedule/${reservation.year}/${reservation.month}/${reservation.day}.json`, reservation)
  }

  dropReservation(id: string, court: Court, rowStart: number, rowEnd: number, timeStart: string, timeEnd: string, duration: number, reservation: Reservation): Observable<any> {
    return this.http.patch(`${environment.dbUrl}schedule/${reservation.year}/${reservation.month}/${reservation.day}/${id}.json`, {
      court, rowStart, rowEnd, timeStart, timeEnd, duration
    })
  }

  deleteReservation(reservation: Reservation): Observable<any> {
    return this.http.delete(`${environment.dbUrl}schedule/${reservation.year}/${reservation.month}/${reservation.day}/${reservation.reservationId}.json`)
  }

  getUsers(): Observable<User[]> {
    return this.http.get(`${environment.dbUrl}users.json`).pipe(
      map((response: { [key: string]: User }) => {
        if (response !== null) {
          return Object.keys(response).map(id => {
            let user: User
            return user = {
              userId: id,
              firstName: response[id].firstName,
              lastName: response[id].lastName,
              price: response[id].price
            }
          })
        }
      })
    )
  }

  addUser(user: User): Observable<FbPutResponse> {
    return this.http.post<FbPutResponse>(`${environment.dbUrl}users.json`, user)
  }

  updateUser(user: User): Observable<any> {
    return this.http.patch(`${environment.dbUrl}users/${user.userId}.json`, user)
  }

  constructor(private http: HttpClient) { }
}
