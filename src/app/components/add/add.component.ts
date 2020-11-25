import { Component, OnInit, DoCheck, OnDestroy, AfterContentInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/service/data.service';
import { Reservation, User } from 'src/environments/interfaces';

import { AddService } from '../../service/add.service'
import * as moment from 'moment'
import { Court } from 'src/environments/interfaces'
import { HourService } from 'src/app/service/hour.service';
import { ApiService } from 'src/app/service/api.service'
import { myValidators } from 'src/app/validators/myValidators';
import { ErrorService } from 'src/app/service/error.service';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
  animations: [
    trigger('visible', [
      transition('void => *', [style({ opacity: 0 }), animate(200)]),
      transition('* => void', [style({ opacity: 1 }), animate(200, style({ opacity: 0 }))]),
    ])
  ]
})
export class AddComponent implements OnInit, DoCheck, OnDestroy, AfterContentInit {


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

    this.dataService.canAddReservation(reservation).includes(false) ? this.errorService.toggleError(true, 'Godzina zajęta') : this.apiService.addReservation(reservation).subscribe(
      res => {
        reservation.reservationId = res.name;
        this.dataService.addReservation(reservation);
        this.reservationForm.reset();
        this.searchUser.setValue('');
        this.option.setValue('list')
        this.addService.toggleAdd(false);
        this.court.setValue('1')
      },
    )
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
  get searchUser() {
    return this.reservationForm.get('searchUser')
  }

  constructor(private fb: FormBuilder, public dataService: DataService, public addService: AddService, private hourService: HourService, private apiService: ApiService, private errorService: ErrorService) { }

  ngOnInit() {
    this.addSub = this.addService.addReservation$.subscribe(
      (res) => {
        this.isOpen = res.isOpen;
        this.date.setValue(res.date)
      }
    );
    this.reservationForm = this.fb.group({
      option: ['list'],
      date: ['', Validators.required],
      firstName: [''],
      lastName: [''],
      fullName: ['', Validators.required],
      timeStart: ['', [Validators.required, myValidators.timeValidator]],
      timeEnd: ['', [Validators.required, myValidators.timeValidator]],
      rowStart: [],
      rowEnd: [],
      court: ['1'],
      searchUser: ['']
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
          this.firstName.setValidators([Validators.required, Validators.maxLength(15)]);
          this.lastName.setValidators([Validators.required, Validators.maxLength(30)]);
          this.fullName.setValue(null);
          this.searchUser.setValue('');
          this.fullName.markAsUntouched();
        }
        this.fullName.updateValueAndValidity();
        this.firstName.updateValueAndValidity();
        this.lastName.updateValueAndValidity();
        this.searchUser.updateValueAndValidity();
      }
    )
  };

  ngDoCheck() {
    this.users = this.dataService.users
  }
  ngAfterContentInit() {
  }

  ngOnDestroy() {
    this.addSub.unsubscribe()
    this.reservationForm.reset()
    this.optionSub.unsubscribe()
  }
}
