import { Component, OnInit, DoCheck, OnDestroy, ViewChildren, QueryList, ElementRef, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';
import { Hours, Reservation, Court } from 'src/environments/interfaces';
import { animate, style, transition, trigger } from '@angular/animations';
import { AddService } from '../service/add.service';

import { AlertService } from '../service/alert.service';
import { DataService } from '../service/data.service'
import { EditServiceService } from '../service/edit-service.service';
import { ErrorService } from '../service/error.service';
import { HourService } from '../service/hour.service'
import { InfoService } from '../service/info.service';
import * as moment from 'moment'


@Component({
  selector: 'app-schedule',
  templateUrl: './schedule-page.component.html',
  styleUrls: ['./schedule-page.component.scss'],
  animations: [
    trigger('visible', [
      transition('void => *', [style({ opacity: 0 }), animate(200)]),
      transition('* => void', [style({ opacity: 1 }), animate(200, style({ opacity: 0 }))]),
    ])
  ]
})
export class SchedulePageComponent implements OnInit, DoCheck, OnDestroy {

  @ViewChildren('hour') hour: QueryList<ElementRef>

  date = '2020-11-13'
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

  acctiveBtnAdd: boolean = false

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

  returnCourt(event: { layerY: number, target: HTMLElement }): string | number {
    return isNaN(parseInt(event.target.dataset.court)) ? event.target.dataset.court : parseInt(event.target.dataset.court)
  }
  returnHour(event: { layerY: number, target: HTMLElement }): ElementRef {
    return this.hour.filter(el => event.layerY >= el.nativeElement.dataset.cellStart * 1 && event.layerY < el.nativeElement.dataset.cellEnd * 1).reduce(function (_, cur) { return cur })
  }

  dropReservation(event: { layerY: number, target: HTMLElement }) {
    if (event.target.dataset.dropZone === "true" && this.draggableItem) {
      let court: Court = null
      let dropHour: ElementRef = null
      let newRowStart: number = null
      let newRowEnd: number = null

      court = this.returnCourt(event)
      dropHour = this.returnHour(event)

      newRowStart = dropHour.nativeElement.dataset.rowStart * 1
      newRowEnd = newRowStart + (2 * this.draggableItem.duration)

      this.dataService.changeReservation(court, newRowStart, newRowEnd, this.draggableItem, this.draggableItem.duration) !== false ? this.dragEnd() : this.errorService.toggleError(true, 'Kort zajęty o danej godzinie')
    }
  }

  userAdd(event?: { layerY: number, target: HTMLElement }) {
    if (event !== undefined) {
      let court: Court = ''
      let dropHour: ElementRef = null
      let timeStart: string = ''
      let timeEnd: string = ''
      court = this.returnCourt(event)
      dropHour = this.returnHour(event)
      timeStart = this.hourService.findHour(dropHour.nativeElement.dataset.rowStart * 1)
      timeEnd = this.hourService.findHour(dropHour.nativeElement.dataset.rowStart * 1 + 2)
      this.addService.toggleAdd(true, this.date, court, { timeStart, timeEnd })
    } else {
      this.addService.toggleAdd(true, this.date)
    }
  }

  userEdit(reservation: Reservation, isOpen: boolean) {
    this.editService.editData(reservation)
    this.editService.openEdit(isOpen)
  }
  userDelete(reservation: Reservation, isOpen: boolean) {
    this.alertService.confirmDelete(reservation)
    this.alertService.alertToggle(isOpen)
  }

  inputChange() {
    this.dateY = moment(this.date).format('YYYY').toString()
    this.dateM = moment(this.date).format('MM').toString()
    this.dateD = moment(this.date).format('DD').toString()
    this.dataService.getByDate(this.dateY, this.dateM, this.dateD)
  }

  minutesPlus(reservation: Reservation, position: 'start' | 'end') {
    let newRowStart = reservation.rowStart - 1
    let newRowEnd = reservation.rowEnd + 1
    let newDuration = reservation.duration + 0.5
    if (position === 'start') {
      this.dataService.changeReservation(reservation.court, newRowStart, reservation.rowEnd, reservation, newDuration) === false &&
        this.errorService.toggleError(true, 'Brak miejsca');
    } else if (position === 'end') {
      this.dataService.changeReservation(reservation.court, reservation.rowStart, newRowEnd, reservation, newDuration) === false &&
        this.errorService.toggleError(true, 'Brak miejsca')
    }
  }

  minutesMinus(reservation: Reservation, position: 'start' | 'end') {
    let newRowStart = reservation.rowStart + 1
    let newRowEnd = reservation.rowEnd - 1
    let newDuration = reservation.duration - 0.5
    if (position === 'start' && newDuration >= 0.5) {
      this.dataService.changeReservation(reservation.court, newRowStart, reservation.rowEnd, reservation, newDuration)
    } else if (position === 'end' && newDuration >= 0.5) {
      this.dataService.changeReservation(reservation.court, reservation.rowStart, newRowEnd, reservation, newDuration)
    }
  }

  onScroll() {
    if ((window.scrollY >= 135 && window.innerWidth < 992) || (window.scrollY >= 155 && window.innerWidth >= 992)) {
      this.acctiveBtnAdd = true
    } else {
      this.acctiveBtnAdd = false
    }
  }
  constructor(public dataService: DataService, public hourService: HourService, private alertService: AlertService, private infoService: InfoService, private editService: EditServiceService, private errorService: ErrorService, private addService: AddService,) { }

  ngOnInit() {
    this.hours = this.hourService.hours
    this.infoSub = this.infoService.cancleDrag$.subscribe(
      (res) => { res && this.dragEnd() }
    )
    this.openSub = this.infoService.isOpen$.subscribe(
      (isOpen) => { this.isOpen = isOpen }
    )
    this.inputChange()
  }
  ngDoCheck() {
    this.courtOne = this.dataService.reservation.filter(reservation => reservation.court === 1)
    this.courtTwo = this.dataService.reservation.filter(reservation => reservation.court === 2)
    this.dressroom = this.dataService.reservation.filter(reservation => reservation.court === 'dressroom')
  }

  ngOnDestroy() {
    this.infoSub.unsubscribe()
    this.openSub.unsubscribe()
  }
}