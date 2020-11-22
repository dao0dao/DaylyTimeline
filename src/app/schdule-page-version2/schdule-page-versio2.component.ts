import { Component, OnInit } from '@angular/core';
import * as moment from 'moment'
import { Hours, User } from 'src/environments/interfaces';
import { DataService } from '../service/data.service';
import { HourService } from '../service/hour.service';

@Component({
  selector: 'app-schdule-page-version2',
  templateUrl: './schdule-page-version2.component.html',
  styleUrls: ['./schdule-page-version2.component.scss']
})
export class SchdulePageVersion2Component implements OnInit {

  users: User[] = []
  hours: Hours[] = []

  date = '2020-11-13'
  dateY: string
  dateM: string
  dateD: string

  inputChange() {
    this.dateY = moment(this.date).format('YYYY').toString()
    this.dateM = moment(this.date).format('MM').toString()
    this.dateD = moment(this.date).format('DD').toString()
    this.dataService.getByDate(this.dateY, this.dateM, this.dateD)
  }

  constructor(private dataService: DataService, private hourService: HourService) { }

  ngOnInit() {
    this.inputChange()
    this.dataService.users = this.users
    this.hours = this.hourService.hours
  }

}
