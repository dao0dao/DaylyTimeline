import { Injectable } from '@angular/core';

import { Hours } from '../../environments/interfaces'
import * as moment from 'moment'



@Injectable({
  providedIn: 'root'
})
export class HourService {

  hours: Hours[] = []

  startHour = moment({ hour: 23, minute: 30 })

  pushHours() {
    for (let i = 1; i < 49; i++) {
      const newTime = this.startHour.add(30, 'minute')
      let hh: number | string = newTime.get('hours')
      let min: number | string = newTime.get('minutes')
      if (hh < 10) { hh = '0' + hh }
      if (min < 10) { min = '0' + min }
      const newHour: Hours = {
        hour: `${hh}:${min}`,
        rowStart: i + 1
      }
      this.hours.push(newHour)
    }
  }

  findHour(row: number): string {
    let time: string
    this.hours.map(el => {
      if (el.rowStart === row) { time = el.hour } else if (row >= 50) { time = '00:00' }
    })
    return time
  }

  findRowStart(hour: string): number {
    let rowStart: number
    this.hours.map(el => {
      if (el.hour === hour) { rowStart = el.rowStart }
    })
    return rowStart
  }

  findRowEnd(hour: string): number {
    let rowEnd: number
    rowEnd = this.findRowStart(hour) + 1
    return rowEnd
  }
  constructor() { }
}
