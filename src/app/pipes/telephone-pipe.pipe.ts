import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'telephonePipe'
})
export class TelephonePipePipe implements PipeTransform {

  transform(value: number): string {
    let number: string = ''
    for (let i = 0; i < value.toString().length / 3; i++) {
      number = number.concat('-' + value.toString().slice(0 + 3 * i, 3 + 3 * i))
    }
    number = number.slice(1)
    return number;
  }

}
