import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Hours } from 'src/environments/interfaces';
import { InfoService } from '../service/info.service';

@Component({
  selector: 'app-background-grid',
  templateUrl: './background-grid.component.html',
  styleUrls: ['./background-grid.component.scss']
})
export class BackgroundGridComponent implements OnInit {

  @Input('hours') hours: Array<Hours>

  openSub: Subscription
  isOpen: boolean = false

  constructor(public infoService: InfoService) { }

  ngOnInit() {
    this.openSub = this.infoService.isOpen$.subscribe(
      (isOpen) => { this.isOpen = isOpen }
    )
  }

}
