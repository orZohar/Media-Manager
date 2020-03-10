import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleBooksService } from '../../services/google-books.service';
import { FormGroupDirective, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {
  username: string;
  private registerForm: FormGroup;
  loading = false;
  submitted = false;

  @ViewChild('bookForm', { static: true }) bookForm: FormGroupDirective;;

  constructor(private router: Router, private googleBooksService: GoogleBooksService, private formBuilder: FormBuilder, private toastrService : ToastrService) { }
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
    });

  }

  goToSearchPage() {
    // check if the form is valid
    if (!this.bookForm.valid) {
      return;
    }

    // add user to session storage
    this.loading = true;
    this.registerForm.value.username = this.username;
    this.googleBooksService.login(this.registerForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.googleBooksService.isLoggedIn = true; 
          this.toastrService.success('Registration successful');
          this.router.navigate(['search']);
        },
        error => {
          this.toastrService.error('error');
          this.loading = false;
        });
  }
}
