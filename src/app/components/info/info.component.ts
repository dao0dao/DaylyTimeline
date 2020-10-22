import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Reservation } from 'src/environments/interfaces';

import { InfoService } from '../../service/info.service'

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit, OnDestroy {

  openSub: Subscription
  reservationSub: Subscription

  isOpen: boolean = false
  reservation: Reservation = null

  cancleDrag() {
    this.infoService.stopDrag()
  }

  constructor(public infoService: InfoService) { }

  ngOnInit() {
    this.openSub = this.infoService.isOpen$.subscribe(
      (isOpen) => { this.isOpen = isOpen }
    )
    this.reservationSub = this.infoService.data$.subscribe(
      (reservation) => { reservation ? this.reservation = reservation : reservation = null }
    )
  }
  ngOnDestroy() {
    this.openSub.unsubscribe()
    this.reservationSub.unsubscribe()
  }

}
