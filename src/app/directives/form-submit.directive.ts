import { Directive, Input, HostListener } from '@angular/core';

@Directive({
  selector: '[cnFormSubmit]'
})
export class FormSubmitDirective {

  constructor() { }
  @Input() form: any;  

  @HostListener('click') onClick() {
    this.form.onSubmit(); // triggers submit
    this.form.form.updateValueAndValidity({ onlySelf: false, emitEvent: true });
  }
}