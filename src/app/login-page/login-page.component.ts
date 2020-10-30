import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  userForm : FormGroup

  get email (){
    return this.userForm.get('email')
  }
  get password (){
    return this.userForm.get('password')
  }

login(){
  console.log(this.userForm);
}

  constructor(private fb : FormBuilder) { }

  ngOnInit(){
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

}
