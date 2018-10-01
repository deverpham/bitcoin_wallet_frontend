import { Directive, Input } from '@angular/core';
import {Validator ,AbstractControl, ValidatorFn, NG_VALIDATORS} from '@angular/forms'

@Directive({
  selector: '[appRetypepassword]',
  providers: [{provide: NG_VALIDATORS, useExisting: RetypepasswordDirective, multi: true}]
})
export class RetypepasswordDirective implements Validator {
  @Input('appRetypepassword') password: string;
  constructor() { 
  }
  validate(control: AbstractControl) {
    const nowPassword = control.value;
    return nowPassword != this.password? { 'appRetypepassword': true} : null;
  }
}
