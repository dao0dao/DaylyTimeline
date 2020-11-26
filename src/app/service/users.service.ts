import { Injectable } from '@angular/core';
import { ApiService } from './api.service'
import { direction, field, User } from 'src/environments/interfaces'

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  getUsers() {
    this.apiService.getUsers().subscribe(
      (users: User[]) => {
        if (users) {
          this.users = users
          users.map(() => this.openUser.push(false))
        }
      }
    )
  }

  addUser(user: User) {
    this.users.push(user)
  }

  findUserById(id: string): User {
    return this.users.find(user => user.userId === id)
  }

  updateUser(user: User) {
    return this.apiService.updateUser(user).subscribe(
      (res) => {
        this.users = this.users.map(el => el.userId === res.userId ? el = res : el)
      },
    )
  }

  deleteUser(user: User) {
    this.apiService.deleteUser(user).subscribe(
      () => {
        this.users = this.users.filter(el => el.userId !== user.userId)
      }
    )
  }
  sortUsers(field: field, direction: direction) {

    if (field === 'lastName' && direction === 'start') {
      this.users.sort((a, b) => (a.lastName.localeCompare(b.lastName)))
    } else if (field === 'lastName' && direction === 'end') {
      this.users.sort((a, b) => (b.lastName.localeCompare(a.lastName)))
    } else if (field === 'firstName' && direction === 'start') {
      this.users.sort((a, b) => (a.firstName.localeCompare(b.firstName)))
    } else if (field === 'firstName' && direction === 'end') {
      this.users.sort((a, b) => (b.firstName.localeCompare(a.firstName)))

    } else if (field === 'price' && direction === 'start') {
      this.users.sort((a, b) => (a.price - b.price))
    } else if (field === 'price' && direction === 'end') {
      this.users.sort((a, b) => (b.price - a.price))
    }

  }
  users: User[] = []
  openUser: Array<boolean> = []

  constructor(private apiService: ApiService) { }
}
