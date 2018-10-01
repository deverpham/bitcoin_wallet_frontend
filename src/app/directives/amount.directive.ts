import { Directive, Input } from '@angular/core';
import {AbstractControl, Validator, NG_VALIDATORS} from '@angular/forms'
@Directive({
  selector: '[appAmount]',
  providers: [{provide: NG_VALIDATORS, useExisting: AmountDirective, multi: true}]
})
export class AmountDirective implements Validator {
  @Input ('appAmount') balance;
  constructor() { }
  validate(control: AbstractControl) {
    const amount = control.value;
    console.log(this.balance)
    return amount  > this. balance ? { 'appAmount' : true} : null;
  }

}
