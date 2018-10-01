import { Directive, Input } from '@angular/core';
import {AbstractControl, Validator, NG_VALIDATORS} from '@angular/forms'
@Directive({
  selector: '[appAddress]',
  providers: [{provide: NG_VALIDATORS, useExisting: AddressDirective, multi: true}]
})
export class AddressDirective implements Validator {
  @Input ('appAddress') address;
  constructor() { }
  validate(control: AbstractControl) {
    const address = control.value;
    console.log(this.address, address)
    return address  == this.address ? { 'appAddress' : true} : null;
  }

}
