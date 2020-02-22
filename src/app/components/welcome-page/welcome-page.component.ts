import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleBooksService } from '../../services/google-books.service';
import { FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {
  username: string;
  @ViewChild('bookForm', { static: true }) bookForm: FormGroupDirective;;

  constructor(private router: Router, private googleBooksService: GoogleBooksService) { }
  ngOnInit() { }
  goToSearchPage() {
    // check if the form is valid
    if (!this.bookForm.valid) {
      return;
    }

    // update service - login and username
    this.googleBooksService.setLogin(true);
    this.googleBooksService.setUserName(this.username);
    this.router.navigate(['search']);
  }
}
