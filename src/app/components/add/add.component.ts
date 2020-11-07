import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/service/data.service';
import { Reservation, User } from 'src/environments/interfaces';

import { AddService } from '../../service/add.service'
import * as moment from 'moment'
import { Court } from 'src/environments/interfaces'
import { HourService } from 'src/app/service/hour.service';
import { myValidators } from 'src/app/validators/myValidators';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit, DoCheck, OnDestroy {

  isOpen: boolean = false
  users: User[]
  reservationForm: FormGroup
  wrongTime: boolean = false
  addSub: Subscription
  optionSub: Subscription

  inputChange() {
    if (this.hourService.setRow(this.timeEnd.value) - this.hourService.setRow(this.timeStart.value) < 1) { this.wrongTime = true } else { this.wrongTime = false }
  }

  submit() {
    let reservation: Reservation = null;
    let user: User = null;
    let year: string;
    let month: string;
    let day: string;
    let court: Court;
    let timeStart: string;
    let timeEnd: string;
    let rowStart: number;
    let duration: number;
    let rowEnd: number;

    year = moment(this.date.value).format('YYYY').toString()
    month = moment(this.date.value).format('MM').toString()
    day = moment(this.date.value).format('DD').toString()

    court = this.court.value
    switch (court) {
      case "1":
        court = 1
        break;
      case "2":
        court = 2
        break;
      case 1:
        court = 1
        break;
      case 2:
        court = 2
        break;
      default: court = 'dressroom'
        break;
    }

    timeStart = this.timeStart.value
    timeEnd = this.timeEnd.value
    rowStart = this.hourService.setRow(timeStart)
    rowEnd = this.hourService.setRow(timeEnd)
    duration = (rowEnd - rowStart) / 2

    if (this.option.value === 'list') {
      user = this.dataService.findUserById(this.fullName.value)
    } else {
      user = {
        firstName: this.firstName.value,
        lastName: this.lastName.value
      }
    }

    reservation = {
      year, month, day, court, timeStart, timeEnd, rowStart, rowEnd, duration, user
    }
    console.log(
      this.dataService.canAddReservation(court, rowStart, rowEnd)
    );
  }

  get option() {
    return this.reservationForm.get('option')
  }
  get date() {
    return this.reservationForm.get('date')
  }
  get firstName() {
    return this.reservationForm.get('firstName')
  }
  get lastName() {
    return this.reservationForm.get('lastName')
  }
  get fullName() {
    return this.reservationForm.get('fullName')
  }
  get timeStart() {
    return this.reservationForm.get('timeStart')
  }
  get timeEnd() {
    return this.reservationForm.get('timeEnd')
  }
  get court() {
    return this.reservationForm.get('court')
  }

  constructor(private fb: FormBuilder, public dataService: DataService, public addService: AddService, private hourService: HourService) { }

  ngOnInit() {
    this.addSub = this.addService.addReservation$.subscribe(
      (res) => {
        this.isOpen = res.isOpen;
        this.date.setValue(res.date)
      }
    );
    this.reservationForm = this.fb.group({
      option: ['new'],
      date: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      fullName: [''],
      timeStart: ['', [Validators.required, myValidators.timeValidator]],
      timeEnd: ['', [Validators.required, myValidators.timeValidator]],
      rowStart: [],
      rowEnd: [],
      court: ['1']
    });
    this.optionSub = this.option.valueChanges.subscribe(
      (value) => {
        if (value === 'list') {
          this.fullName.setValidators(Validators.required);
          this.firstName.setValidators(null);
          this.lastName.setValidators(null);
          this.firstName.setValue(null);
          this.lastName.setValue(null);
          this.firstName.markAsUntouched();
          this.lastName.markAsUntouched();
        } else if (value === 'new') {
          this.fullName.setValidators(null);
          this.firstName.setValidators(Validators.required);
          this.lastName.setValidators(Validators.required);
          this.fullName.setValue(null);
          this.fullName.markAsUntouched();
        }
        this.fullName.updateValueAndValidity();
        this.firstName.updateValueAndValidity();
        this.lastName.updateValueAndValidity();
      }
    )
    this.users = this.dataService.userApi
  };

  ngDoCheck() {

  }

  ngOnDestroy() {
    this.addSub.unsubscribe()
    this.reservationForm.reset()
    this.optionSub.unsubscribe()
  }
}
