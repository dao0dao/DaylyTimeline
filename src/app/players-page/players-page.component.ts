import { Component, OnInit, DoCheck } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/environments/interfaces';
import { ApiService } from '../service/api.service';
import { DataService } from '../service/data.service';


@Component({
  selector: 'app-players-page',
  templateUrl: './players-page.component.html',
  styleUrls: ['./players-page.component.scss']
})
export class PlayersPageComponent implements OnInit, DoCheck {

  users: User[] = []

  newPlayerActive: boolean = false
  firstActive: boolean = false
  lastActive: boolean = false
  priceActive: boolean = false
  telephoneActive: boolean = false
  newUserForm: FormGroup

  openUsers: Array<boolean> = []
  editFirst: boolean = false
  editLast: boolean = false
  editedPrice: boolean = false
  editTel: boolean = false
  editUserForm: FormGroup



  get firstName() {
    return this.newUserForm.get('firstName')
  }
  get lastName() {
    return this.newUserForm.get('lastName')
  }
  get price() {
    return this.newUserForm.get('price')
  }
  get telephone() {
    return this.newUserForm.get('telephone')
  }


  get userId() {
    return this.editUserForm.get('userId')
  }
  get editFirstName() {
    return this.editUserForm.get('firstName')
  }
  get editLastName() {
    return this.editUserForm.get('lastName')
  }
  get editPrice() {
    return this.editUserForm.get('price')
  }
  get editTelephone() {
    return this.editUserForm.get('telephone')
  }

  focus(name: string) {
    this[name] = true
  }

  onBlure(name: string) {
    this[name] = false
  }

  toggleInput() {
    this.newPlayerActive = !this.newPlayerActive
    this.newPlayerActive === false && this.newUserForm.reset()
  }

  submit() {
    let user: User
    user = {
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      price: this.price.value,
      telephone: this.telephone.value
    }
    this.apiService.addUser(user).subscribe(
      (res) => {
        user.userId = res.name;
        this.dataService.addUser(user);
        this.newUserForm.reset()
      }
    );
  }

  openEdit(id: number, user: User) {
    this.editUserForm.reset()
    for (let i = 0; i < this.openUsers.length; i++) {
      i === id ? this.openUsers[i] = !this.openUsers[i] : this.openUsers[i] = false;
      if (this.openUsers[id] === true) {
        this.userId.setValue(user.userId)
        this.editFirstName.setValue(user.firstName)
        this.editLastName.setValue(user.lastName)
        this.editPrice.setValue(user.price)
        this.editTelephone.setValue(user.telephone)
      }
    }
  }

  constructor(private fb: FormBuilder, private apiService: ApiService, private dataService: DataService) { }

  ngOnInit() {
    this.newUserForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      price: [null],
      telephone: [null]
    })

    this.editUserForm = this.fb.group({
      userId: [],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      price: [null],
      telephone: [null]
    })
  }

  ngDoCheck() {
    this.users = this.dataService.users
    this.openUsers = this.dataService.openUser
    if (!this.price.value) {
      this.price.setValue('')
    }
    if (!this.telephone.value) {
      this.telephone.setValue('')
    }
  }
}
