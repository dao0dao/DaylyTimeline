import { Component, OnInit, DoCheck } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { User } from 'src/environments/interfaces';
import { AlertService } from '../service/alert.service';
import { ApiService } from '../service/api.service';
import { DataService } from '../service/data.service';
import { ErrorService } from '../service/error.service';
import { myValidators } from '../validators/myValidators';


@Component({
  selector: 'app-players-page',
  templateUrl: './players-page.component.html',
  styleUrls: ['./players-page.component.scss'],

})
export class PlayersPageComponent implements OnInit, DoCheck {

  search: string = ''

  users: User[] = []

  searchActive: boolean = false
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
      price: this.price.value === null ? 0 : Math.abs(this.price.value.toFixed(2)),
      telephone: this.telephone.value
    }
    if (this.users.length < 10) {
      this.apiService.addUser(user).subscribe(
        (res) => {
          user.userId = res.name;
          this.dataService.addUser(user);
          this.newUserForm.reset()
        }
      );
      this.newPlayerActive = false
    } else {
      this.errorService.toggleError(true, 'Limit graczy')
      this.newUserForm.reset()
      this.newPlayerActive = false
    }
  }

  openEdit(id: number, user: User) {
    for (let i = 0; i < this.openUsers.length; i++) {
      i === id ? this.openUsers[i] = !this.openUsers[i] : this.openUsers[i] = false;
      if (this.openUsers[id] === true) {
        this.userId.setValue(user.userId)
        this.editFirstName.setValue(user.firstName)
        this.editLastName.setValue(user.lastName)
        this.editPrice.setValue(user.price === null ? '0' : user.price)
        this.editTelephone.setValue(user.telephone)
      } else {
        this.editUserForm.reset()
      }
    }
  }

  updateUser() {
    let user: User
    user = {
      userId: this.userId.value,
      firstName: this.editFirstName.value,
      lastName: this.editLastName.value,
      price: this.editPrice.value === null ? 0 : Math.abs(this.editPrice.value.toFixed(2)),
      telephone: this.editTelephone.value
    }
    this.dataService.updateUser(user)
    for (let i = 0; i < this.openUsers.length; i++) {
      this.openUsers[i] = false
    }
  }

  deleteUser(user: User) {
    this.alertService.alertToggle(true)
    this.alertService.userData(user)
  }

  sanitizeSMS(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  constructor(private fb: FormBuilder, private apiService: ApiService, private dataService: DataService, private alertService: AlertService, private errorService: ErrorService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.newUserForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(15)]],
      lastName: ['', [Validators.required, Validators.maxLength(30)]],
      price: [null, [Validators.max(999), myValidators.priceComa]],
      telephone: [null, [myValidators.telephoneValidator, myValidators.telephoneLength]]
    })

    this.editUserForm = this.fb.group({
      userId: [],
      firstName: ['', [Validators.required, Validators.maxLength(15)]],
      lastName: ['', [Validators.required, Validators.maxLength(30)]],
      price: [null, [Validators.max(999), myValidators.priceComa]],
      telephone: [null, [myValidators.telephoneValidator, myValidators.telephoneLength]]
    })
  }

  ngDoCheck() {
    this.users = this.dataService.users
    this.openUsers = this.dataService.openUser
    if (!this.telephone.value) {
      this.telephone.setValue('')
    }
  }
}
