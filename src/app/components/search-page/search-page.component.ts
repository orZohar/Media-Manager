import { Component, OnInit } from '@angular/core';
import { GoogleBooksService } from '../../services/google-books.service';
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
  
  constructor(private googleBooksService: GoogleBooksService) {
    // before sending the searchtext to booklist component debounce it
    this.subscriptions.add(this.modelChanged
    .pipe(
      debounceTime(this.milisecToDebounce))
    .subscribe(() => {
      this.searchTextObservable.next(this.searchText);
    }))
   };

  ngOnInit() {
    this.welcomeUserMsg = this.googleBooksService.getUserName();
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