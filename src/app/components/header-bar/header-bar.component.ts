import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.scss']
})
export class HeaderBarComponent implements OnInit {
  booksCount: number = 0;
  subscriptions: Subscription = new Subscription();

  constructor(private eventService: EventService) { }

  ngOnInit() {
    // listener for user data for openning chat with spesific user directly 
    this.subscriptions.add(this.eventService.on("CHANGES_CART_COUNT", (add: any) => {
      add ? this.booksCount++ : this.booksCount--;
    }));
  }
}
