import { AbstractControl, FormControl, ValidatorFn } from '@angular/forms'

export class myValidators {

    static timeValidator(control: FormControl ): { [key: string]: boolean } {
        if (!control || !control.value) { return null }
        else if (control.value.slice(-2) === '00' || control.value.slice(-2) === '30') {
            return null
        } else {
            return { timeValidator: true }
        }
    }

}