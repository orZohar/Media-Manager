import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { EventService } from '../../core/services/event.service';
import { Router } from '@angular/router';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faCog } from '@fortawesome/free-solid-svg-icons';


import { SelectItem } from 'primeng/api/selectitem';
import { MediaService } from '../services/media.service';
class ImageSnippet {
  constructor(public src: string, public file: File) {}
}
@Component({
  selector: 'header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.scss']
})
export class HeaderBarComponent implements OnInit {
  // @ViewChild('dd', { static: true }) dd: ElementRef<HTMLElement>;

  booksCount: number = 0;
  subscriptions: Subscription = new Subscription();
  faUser = faUser;
  arrayOfUserNames: any;
  faSortDown = faSortDown;
  faShoppingCart = faShoppingCart;
  faCog = faCog;
  username: string;

  
  searchOptions: SelectItem[] = [
    { label: 'Login', value: 'login' },
    { label: 'Logout', value: 'logout' },
  ];
  constructor(private eventService: EventService, private router: Router, private mediaService : MediaService ) { }

  // private imageService: ImageService
  ngOnInit() {
    // listener for user data for openning chat with spesific user directly 
    this.subscriptions.add(this.eventService.on("SHOW_LOGGED_USER", (user: any) => {
      console.log(this.mediaService.user)
      this.username = this.mediaService.user.userData.username;
    }));
  }
}