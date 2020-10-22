import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AlertService } from '../../service/alert.service'
import { DataService } from '../../service/data.service'

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {

  toggler: Subscription
  alertSub: Subscription
  isOpen: boolean = false
  reservationId: string
  timeStart: string
  timeEnd: string
  firstName: string
  lastName: string

  confirmDelete() {
    this.dataService.deleteReservation(this.reservationId)
    this.closeAlert()
  }

  closeAlert() {
    this.alertService.alertToggle(false)
    this.alertService.confirmDelete(false)
  }

  constructor(private alertService: AlertService, private dataService: DataService) { }

  ngOnInit() {
    this.toggler = this.alertService.alertToggle$.subscribe(
      (isOpen) => { this.isOpen = isOpen }
    )
    this.alertSub = this.alertService.userDelete$.subscribe(
      (reservation) => {
        if (reservation) {
          this.reservationId = reservation.reservationId
          this.timeStart = reservation.timeStart
          this.timeEnd = reservation.timeEnd
          this.firstName = reservation.user.firstName
          this.lastName = reservation.user.lastName
        } else {
          this.reservationId = this.timeStart = this.timeEnd = this.firstName = this.lastName = null
        }
      }
    )
  }

  ngOnDestroy() {
    this.toggler.unsubscribe()
    this.alertSub.unsubscribe()
  }

}
