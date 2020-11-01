import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/service/data.service';
import { ErrorService } from 'src/app/service/error.service';

import { HourService } from 'src/app/service/hour.service';
import { Reservation } from 'src/environments/interfaces';
import { EditServiceService } from '../../service/edit-service.service';
import { myValidators } from '../../validators/myValidators';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy, DoCheck {

  openSub: Subscription;
  dataSub: Subscription;
  reservationForm: FormGroup;

  wrongTime: boolean = false
  user: string = '';
  isOpen: boolean = false;
  editedReservation: Reservation = null;


  get firstName() {
    return this.reservationForm.get('firstName')
  };
  get lastName() {
    return this.reservationForm.get('lastName')
  };
  get timeStart() {
    return this.reservationForm.get('timeStart')
  };
  get timeEnd() {
    return this.reservationForm.get('timeEnd')
  };
  get court() {
    return this.reservationForm.get('court')
  };
  get rowStart() {
    return this.reservationForm.get('rowStart')
  };
  get rowEnd() {
    return this.reservationForm.get('rowEnd')
  };

  cancleChanges() {
    this.editService.openEdit(false)
    this.reservationForm.reset()
  };

  applyChanges() {
    let court: number | string = this.court.value;
    let newRowStart: number = this.hourService.setRow(this.timeStart.value);
    let newRowEnd: number = this.hourService.setRow(this.timeEnd.value);

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

    this.dataService.changeReservation(court, newRowStart, newRowEnd, this.editedReservation) !== false ? this.editService.openEdit(false) : this.errorService.toggleError(true, 'brak miejsca');
  }

  inputChange() {
    parseInt(this.rowEnd.value) - parseInt(this.rowStart.value) < 1 ? this.wrongTime = true : this.wrongTime = false
  }

  constructor(private fb: FormBuilder, private editService: EditServiceService, private hourService: HourService, private dataService: DataService, private errorService: ErrorService) { };

  ngOnInit() {
    this.reservationForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      timeStart: ['', [Validators.required, myValidators.timeValidator]],
      timeEnd: ['', [Validators.required, myValidators.timeValidator]],
      rowStart: [],
      rowEnd: [],
      court: ['']
    });
    this.dataSub = this.editService.editData$.subscribe(
      (reservation) => {
        this.editedReservation = reservation;
        this.firstName.setValue(reservation.user.firstName);
        this.lastName.setValue(reservation.user.lastName);
        this.timeStart.setValue(reservation.timeStart);
        this.timeEnd.setValue(reservation.timeEnd);
        this.court.setValue(reservation.court);
        this.user = `${reservation.user.firstName} ${reservation.user.lastName}`;
      });
    this.openSub = this.editService.editIsOpen$.subscribe(
      (isOpen) => {
        this.isOpen = isOpen;
        !isOpen && this.reservationForm.reset();
      });
  };

  ngDoCheck() {
    this.rowStart.setValue(this.hourService.setRow(this.timeStart.value))
    this.rowEnd.setValue(this.hourService.setRow(this.timeEnd.value))
  }

  ngOnDestroy() {
    this.openSub.unsubscribe();
    this.dataSub.unsubscribe();
  };
};