import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/auth.service';
import { DataService } from './service/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  menuActive: boolean = false

  constructor(public authService: AuthService, private dataService: DataService) { }

  ngOnInit() {
    if (this.authService.isAuth()) {
      this.dataService.getUsers()
    }
  }
}
