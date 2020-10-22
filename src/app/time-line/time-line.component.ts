import { Component, OnInit, DoCheck, OnDestroy, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { Hours, Reservation, court } from 'src/environments/interfaces';
import { AlertService } from '../service/alert.service';

import { DataService } from '../service/data.service'
import { HourService } from '../service/hour.service'
import { InfoService } from '../service/info.service';

@Component({
  selector: 'app-time-line',
  templateUrl: './time-line.component.html',
  styleUrls: ['./time-line.component.scss']
})
export class TimeLineComponent implements OnInit, DoCheck, OnDestroy {


  @ViewChildren('hour') hour: QueryList<ElementRef>

  infoSub: Subscription
  openSub: Subscription
  isOpen: boolean = false
  draggableItem: Reservation = null
  hours: Hours[]
  courtOne: Reservation[]
  courtTwo: Reservation[]
  dressroom: Reservation[]

  offsetTop(event: HTMLElement) {
    return event.offsetTop;
  }

  dragEnd() {
    this.draggableItem.isActive = false
    this.draggableItem = null
    this.infoService.openInfo(false)
    this.infoService.moveData(null)
  }

  dragStart(reservation: Reservation) {
    if (this.draggableItem === null) {
      this.draggableItem = reservation
      this.draggableItem.isActive = true
      this.infoService.moveData(reservation)
      this.infoService.openInfo(true)
    } else if (this.draggableItem === reservation) {
      this.dragEnd()
    } else {
      this.dragEnd()
      this.draggableItem = reservation
      this.draggableItem.isActive = true
      this.infoService.moveData(reservation)
      this.infoService.openInfo(true)
    }
  }

  dropReservation(event: { layerY: number, target: HTMLElement }) {
    if (event.target.dataset.dropZone === "true" && this.draggableItem) {
      let court: court = null
      let dropHour: ElementRef = null
      let newRowStart: number = null
      let newRowEnd: number = null

      court = isNaN(parseInt(event.target.dataset.court)) ? event.target.dataset.court : parseInt(event.target.dataset.court)
      dropHour = this.hour.filter(el => event.layerY >= el.nativeElement.dataset.cellStart * 1 && event.layerY < el.nativeElement.dataset.cellEnd * 1).reduce(function (_, cur) { return cur })

      newRowStart = dropHour.nativeElement.dataset.rowStart * 1
      newRowEnd = newRowStart + (2 * this.draggableItem.duration)

      if (!this.dataService.checkReservation(court, newRowStart, newRowEnd, this.draggableItem).includes(false)) {
        this.draggableItem.court = court
        this.draggableItem.rowStart = newRowStart
        this.draggableItem.timeStart = this.hourService.findHour(newRowStart)
        this.draggableItem.timeEnd = this.hourService.findHour(newRowEnd)
        this.dragEnd()
      }
    }
  }
  userEdit(reservation: Reservation) { }
  userDelete(reservation: Reservation, isOpen: boolean) {
    if (!this.isOpen) {
      this.alertService.confirmDelete(reservation)
      this.alertService.alertToggle(isOpen)
    }
  }
  constructor(public dataService: DataService, public hourService: HourService, private alertService: AlertService, private infoService: InfoService) { }

  ngOnInit() {
    this.hourService.pushHours()
    this.hours = this.hourService.hours
    this.infoSub = this.infoService.cancleDrag$.subscribe(
      (res) => { res && this.dragEnd() }
    )
    this.openSub = this.infoService.isOpen$.subscribe(
      (isOpen) => { this.isOpen = isOpen }
    )
  }
  ngDoCheck() {
    this.courtOne = this.dataService.reservation.filter(reservation => reservation.court === 1)
    this.courtOne.map(reservation => reservation.rowEnd = reservation.rowStart + (2 * reservation.duration))
    this.courtTwo = this.dataService.reservation.filter(reservation => reservation.court === 2)
    this.courtTwo.map(reservation => reservation.rowEnd = reservation.rowStart + (2 * reservation.duration))
    this.dressroom = this.dataService.reservation.filter(reservation => reservation.court === 'dressroom')
    this.dressroom.map(reservation => reservation.rowEnd = reservation.rowStart + (2 * reservation.duration))
  }

  ngOnDestroy() {
    this.infoSub.unsubscribe()
    this.openSub.unsubscribe()
  }
}