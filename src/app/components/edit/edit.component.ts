import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { HourService } from 'src/app/service/hour.service';
import { EditServiceService } from '../../service/edit-service.service'
import { myValidators } from '../../validators/myValidators'


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy {

  isOpen: boolean = false
  reservationForm: FormGroup

  openSub: Subscription
  dataSub: Subscription

  get name() {
    return this.reservationForm.get('name')
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

  cancleChanges() {
    this.editService.openEdit(false)
    this.reservationForm.reset()
  }

  applyChanges() {

  }

  constructor(private fb: FormBuilder, private editService: EditServiceService, private hourService: HourService) { }

  ngOnInit() {
    this.reservationForm = this.fb.group({
      name: [''],
      timeStart: ['', [Validators.required, myValidators.timeValidator]],
      timeEnd: ['', [Validators.required, myValidators.timeValidator]],
      court: ['']
    })
    this.openSub = this.editService.editIsOpen$.subscribe(
      (isOpen) => { this.isOpen = isOpen }
    )
    this.dataSub = this.editService.editData$.subscribe(
      (reservation) => {
        this.name.setValue(`${reservation.user.firstName} ${reservation.user.lastName}`)
        this.timeStart.setValue(reservation.timeStart)
        this.timeEnd.setValue(reservation.timeEnd)
        this.court.setValue(reservation.court)
      }
    )
  }

  ngOnDestroy() {
    this.openSub.unsubscribe()
    this.dataSub.unsubscribe()
  }
}
