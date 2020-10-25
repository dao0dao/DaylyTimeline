import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { ErrorService } from '../../service/error.service'

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit, OnDestroy {

  errorSub: Subscription
  title: string = 'kort zajęty o danej godzinie'
  isOpen: boolean = false

  closeError() {
    this.errorService.toggleError(false, null)
  }

  constructor(private errorService: ErrorService) { }

  ngOnInit() {
    this.errorSub = this.errorService.error$.subscribe(
      (error) => {
        this.title = error.title;
        this.isOpen = error.isOpen;
        setTimeout(() => {
          this.closeError()
        }, 3000)
      }
    )
  }

  ngOnDestroy() {
    this.errorSub.unsubscribe()
  }

}
