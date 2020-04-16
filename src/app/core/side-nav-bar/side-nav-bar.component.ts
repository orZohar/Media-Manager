import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { trigger, transition, style, animate } from '@angular/animations';
import { MediaService } from 'src/app/core/services/media.service';

@Component({
  selector: 'side-nav-bar',
  templateUrl: './side-nav-bar.component.html',
  styleUrls: ['./side-nav-bar.component.scss'],
})
export class SideNavBarComponent implements OnInit {
  isLoggedIn: boolean;
  subscriptions: Subscription = new Subscription();

  constructor(private router: Router, private mediaService: MediaService) { }

  ngOnInit() {
    // if the user is logged in and navigation ended open media and SearchPage tabs
    this.subscriptions.add(this.router.events.subscribe((event: any) => {
      if (this.mediaService.isUserLoggedIn() && event instanceof NavigationEnd) {
        this.isLoggedIn = true;
      };
    }));
  }
}