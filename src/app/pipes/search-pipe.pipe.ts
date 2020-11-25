import { Pipe, PipeTransform } from '@angular/core';
import { User } from 'src/environments/interfaces';

@Pipe({
  name: 'searchPipe'
})
export class SearchPipePipe implements PipeTransform {

  transform(users: User[], text: string | null): User[] {
    let search = text.toLocaleLowerCase().trim()
    let searchWords: Array<any> = search.split(' ')
    if (!text.trim()) {
      return users
    } else {
      searchWords.map(word => {
        users = users.filter(user => (user.firstName.toLocaleLowerCase().includes(word) || user.lastName.toLocaleLowerCase().includes(word) || (user.telephone && user.telephone.toString().includes(word)) || (user.price && user.price.toString().includes(word)) || (user.note && user.note.toLocaleLowerCase().includes(word))))
      })
    }
    return users
  }

}
