import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginUser } from 'src/environments/interfaces';

import { AuthService } from '../service/auth.service'
import { DataService } from '../service/data.service';
import { UsersService } from '../service/users.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  userForm: FormGroup
  emailFocus: boolean = false
  passwordFocus: boolean = false
  submitDisable: boolean = false

  focus(name: string) {
    this[name] = true
  }
  onBlur(name: string) {
    this[name] = false
  }

  get email() {
    return this.userForm.get('email')
  }
  get password() {
    return this.userForm.get('password')
  }

  login() {
    this.submitDisable = true;
    let loginUser: LoginUser = {
      email: this.email.value,
      password: this.password.value,
      returnSecureToken: true
    }
    this.authService.signIn(loginUser).subscribe(
      () => {
        this.userService.getUsers()
        this.submitDisable = false
        this.userForm.reset()
        this.router.navigate(['/daily_schedule'])
      },
      () => {
        this.submitDisable = false
        this.userForm.reset()
      },
      () => {
        this.submitDisable = false
        this.userForm.reset()
      }
    )
  }

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private dataService: DataService, private userService : UsersService) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }
}
