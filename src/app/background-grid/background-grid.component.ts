import { Component, Input, OnInit } from '@angular/core';
import { Hours } from 'src/environments/interfaces';

@Component({
  selector: 'app-background-grid',
  templateUrl: './background-grid.component.html',
  styleUrls: ['./background-grid.component.scss']
})
export class BackgroundGridComponent implements OnInit {

  @Input('hours') hours : Array<Hours>

  constructor() { }

  ngOnInit() {

  }

}
