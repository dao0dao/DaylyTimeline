import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/service/users.service';
import { Reservation, User } from 'src/environments/interfaces';

import { AlertService } from '../../service/alert.service'
import { DataService } from '../../service/data.service'

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {

  toggler: Subscription
  reservationSub: Subscription
  userSub: Subscription
  isOpen: boolean = false
  reservation: Reservation = null
  user: User = null

  confirmDelete() {
    this.dataService.deleteReservation(this.reservation)
    this.closeAlert()
  }

  removeUser() {
    this.userService.deleteUser(this.user)
    this.closeAlert()
  }

  closeAlert() {
    this.alertService.alertToggle(false)
    this.alertService.confirmDelete(false)
    this.alertService.userData(false)
  }

  constructor(private alertService: AlertService, private dataService: DataService, private userService : UsersService) { }

  ngOnInit() {
    this.toggler = this.alertService.alertToggle$.subscribe(
      (isOpen) => { this.isOpen = isOpen }
    )
    this.reservationSub = this.alertService.reservationDelete$.subscribe(
      (reservation: Reservation) => {
        if (reservation) {
          this.reservation = reservation
        } else {
          this.reservation = null
        }
      }
    )
    this.userSub = this.alertService.userDelete$.subscribe(
      (user: User) => {
        if (user) {
          this.user = user
        } else {
          this.userSub = null
        }
      }
    )
  }

  ngOnDestroy() {
    this.toggler.unsubscribe()
    this.reservationSub.unsubscribe()
  }

}
