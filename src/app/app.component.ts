import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/auth.service';
import { DataService } from './service/data.service';
import { HourService } from './service/hour.service';
import { UsersService } from './service/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  menuActive: boolean = false

  constructor(public authService: AuthService, private userService : UsersService, private hourService: HourService) { }

  ngOnInit() {
    if (this.authService.isAuth()) {
      this.userService.getUsers()
    }
    this.hourService.pushHours()
  }
}
