import { Pipe, PipeTransform } from '@angular/core';
import { User } from 'src/environments/interfaces';

@Pipe({
  name: 'searchPipe'
})
export class SearchPipePipe implements PipeTransform {

  transform(users: User[], text: string): User[] {
    let search = text.toLocaleLowerCase()
    if (!text.trim()) {
      return users
    } else {
      return users.filter(user => (user.firstName.toLocaleLowerCase().includes(search) || user.lastName.toLocaleLowerCase().includes(search) || (user.telephone && user.telephone.toString().includes(search)) || (user.price && user.price.toString().includes(search)) || (user.note && user.note.toLocaleLowerCase().includes(search))))
    }
  }

}
