import { Component, OnInit, DoCheck, OnDestroy, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { Hours, Reservation, court } from 'src/environments/interfaces';
import { AlertService } from '../service/alert.service';

import { DataService } from '../service/data.service'
import { EditServiceService } from '../service/edit-service.service';
import { ErrorService } from '../service/error.service';
import { HourService } from '../service/hour.service'
import { InfoService } from '../service/info.service';
import * as moment from 'moment'

@Component({
  selector: 'app-time-line',
  templateUrl: './time-line.component.html',
  styleUrls: ['./time-line.component.scss']
})
export class TimeLineComponent implements OnInit, DoCheck, OnDestroy {

  @ViewChildren('hour') hour: QueryList<ElementRef>

  date = moment().format('YYYY-MM-DD')
  dateY: string
  dateM: string
  dateD: string
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

      this.dataService.changeReservation(court, newRowStart, newRowEnd, this.draggableItem) !== false ? this.dragEnd() : this.errorService.toggleError(true, 'Kort zajęty o danej godzinie')
    }
  }
  userEdit(reservation: Reservation, isOpen: boolean) {
    console.log(`click`);
    this.editService.editData(reservation)
    this.editService.openEdit(isOpen)
  }
  userDelete(reservation: Reservation, isOpen: boolean) {
    this.alertService.confirmDelete(reservation)
    this.alertService.alertToggle(isOpen)
  }

  inputChange() {
    this.dateY = moment(this.date).year().toString()
    this.dateM = (moment(this.date).month() + 1).toString()
    this.dateD = moment(this.date).date().toString()
    this.dataService.returnByDate(this.dateY, this.dateM, this.dateD)
  }
  constructor(public dataService: DataService, public hourService: HourService, private alertService: AlertService, private infoService: InfoService, private editService: EditServiceService, private errorService: ErrorService) { }

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
    this.courtTwo = this.dataService.reservation.filter(reservation => reservation.court === 2)
    this.dressroom = this.dataService.reservation.filter(reservation => reservation.court === 'dressroom')
  }

  ngOnDestroy() {
    this.hourService.removeHours()
    this.infoSub.unsubscribe()
    this.openSub.unsubscribe()
  }
}