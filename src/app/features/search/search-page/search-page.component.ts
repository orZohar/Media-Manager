import { Component, OnInit } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { MediaService } from 'src/app/core/services/media.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {
  welcomeUserMsg: string;
  searchText: string;
  milisecToDebounce: number = 1000;
  modelChanged = new Subject<string>(); // obs for triggering debouncer
  searchTextObservable = new Subject<string>(); // obs for send to child component to listen for ngModel changing
  subscriptions: Subscription = new Subscription();
  mediaType: string;

  searchOptions = [
    { label: 'Videos', value: 'videos' },
    { label: 'Books', value: 'books' },
  ];

  constructor(private toastrService: ToastrService, private mediaService: MediaService ) {
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
    this.welcomeUserMsg = JSON.parse(sessionStorage.getItem('user'));
  }

  updateSearchText(event) {
    // assign searchText (came from search-bar component)
    this.searchText = event;

    if (!this.mediaType) {
      this.toastrService.error('Please choose search type');
      return;
    }

    // publish to debounce 
    this.modelChanged.next();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}