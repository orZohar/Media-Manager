import { Component, OnInit } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {
  welcomeUserMsg: string; 
  searchText : string;
  milisecToDebounce: number = 200;
  modelChanged = new Subject<string>(); // obs for triggering debouncer
  searchTextObservable = new Subject<string>(); // obs for send to child component to listen for ngModel changing
  subscriptions: Subscription = new Subscription();
  
  constructor() {
    // before sending the searchtext to booklist component debounce it
    this.subscriptions.add(this.modelChanged
    .pipe(
      debounceTime(this.milisecToDebounce))
    .subscribe(() => {
      this.searchTextObservable.next(this.searchText);
    }))
   };

  ngOnInit() {
    // get username from session storage
    this.welcomeUserMsg  = JSON.parse(sessionStorage.getItem('user'));
  }

  updateSearchText(event) {
    // assign searchText (came from search-bar component)
    this.searchText = event;
    // publish to debounce 
    this.modelChanged.next();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}