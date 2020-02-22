import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { GoogleBooksService } from '../../services/google-books.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'side-nav-bar',
  templateUrl: './side-nav-bar.component.html',
  styleUrls: ['./side-nav-bar.component.scss']
})
export class SideNavBarComponent implements OnInit {
  isLoggedIn: boolean;
  subscriptions: Subscription = new Subscription();

  constructor(private router: Router, private googleBooksService: GoogleBooksService) { }

  ngOnInit() {
    // if the user is logged in and navigation ended open WishList and SearchPage tabs
    this.subscriptions.add(this.router.events.subscribe((event: any) => {
      if (this.googleBooksService.isUserLoggedIn() && event instanceof NavigationEnd) {
        this.isLoggedIn = true;
      };
    }));
  }
}