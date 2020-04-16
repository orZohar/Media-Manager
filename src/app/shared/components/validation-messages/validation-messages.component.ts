import { Component, OnInit, Input } from '@angular/core';
import { merge, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'validation-messages',
  templateUrl: './validation-messages.component.html',
  styleUrls: ['./validation-messages.component.scss']
})
export class ValidationMessagesComponent implements OnInit {
  @Input() form: any;
  @Input() elementsRefs: any[];
  @Input() patternErrorMsg: string;

  private destroyed$: Subject<boolean> = new Subject();
  hasError: boolean = false;
  constructor() { }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  ngOnInit() {
    merge(
      // both triggred when chaging the input. only status (of all children) is triggered when submitting
      this.form._parent.statusChanges, // parent caculates all the parent children status
      this.form.valueChanges
    ).pipe(
      takeUntil(this.destroyed$)).subscribe((v) => {
        if (this.form.invalid && (this.form._parent.submitted || this.form.dirty)) {
          this.errorFunction();
        } else {
          this.validFunction();
        }
      })
  }

  setErrorTheme(elemntRef: any) {
    elemntRef.classList.add("error");
    elemntRef.style.borderColor = "red"
  }

  removeErrorTheme(elemntRef: any) {
    elemntRef.classList.remove("error");
    elemntRef.style.borderColor = null;

  }

  errorFunction() {
    if (!this.hasError) {
      this.hasError = true;
      this.setErrorTheme(this.elementsRefs[0]);
      // if (this.elementsRefs) {
      //   this.elementsRefs.forEach(element => {
      //     this.setErrorTheme(element);
      //   });
      // }
    }
  }
  validFunction() {
    if (this.hasError) {
      this.hasError = false;
      if (this.elementsRefs) {
        this.elementsRefs.forEach(element => {
          this.removeErrorTheme(element);
        });
      }
    }
  }
}