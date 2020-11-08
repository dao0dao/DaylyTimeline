import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Reservation } from 'src/environments/interfaces';

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
  reservation: Reservation

  confirmDelete() {
    this.dataService.deleteReservation(this.reservation)
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
      (reservation: Reservation) => {
        if (reservation) {
          this.reservation = reservation
        } else {
          this.reservation = null
        }
      }
    )
  }

  ngOnDestroy() {
    this.toggler.unsubscribe()
    this.alertSub.unsubscribe()
  }

}
