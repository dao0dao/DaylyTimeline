import { FormControl } from '@angular/forms'

export class myValidators {

    static timeValidator(control: FormControl): { [key: string]: boolean } {
        if (!control || !control.value) { return null }
        else if (control.value.slice(-2) === '00' || control.value.slice(-2) === '30') {
            return null
        } else {
            return { timeValidator: true }
        }
    }

    static telephoneValidator(control: FormControl): { [key: string]: boolean } {
        const RegExp = /([^0-9]+)/g
        if (!control || !control.value) {
            return null
        } else if (RegExp.test(control.value)) {
            return { telephoneValidator: true }
        } else {
            return null
        }
    }

    static telephoneLength(control: FormControl): { [key: string]: boolean } {
        let value: number = control.value
        if (!control || !control.value) {
            return null
        } else if (value.toString().length != 9) {
            return { telephoneLength: true }
        } else {
            return null
        }
    }

    static priceComa(control: FormControl): { [key: string]: boolean } {
        const RegExp = /(,|\.)\d{3,}/g
        if (!control || !control.value) {
            return null
        } else if (RegExp.test(control.value)) {
            return { priceComa: true }
        } else {
            return null
        }

    }
}