import { Component, OnInit } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { MediaService } from 'src/app/core/services/media.service';
import { faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faPhotoVideo } from '@fortawesome/free-solid-svg-icons';
import { EventService } from 'src/app/core/services/event.service';
@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {
  searchText: string;
  milisecToDebounce: number = 1000;
  modelChanged = new Subject<string>(); // obs for triggering debouncer
  searchTextObservable = new Subject<string>(); // obs for send to child component to listen for ngModel changing
  subscriptions: Subscription = new Subscription();
  mediaType: string;
  usersCount: number;
  newMediaCount: number = 0;
  faUserFriends = faUserFriends;
  faEnvelope = faEnvelope;
  faPhotoVideo = faPhotoVideo;

  searchOptions = [
    { label: 'Videos', value: 'videos' },
    { label: 'Books', value: 'books' },
  ];

  constructor(private toastrService: ToastrService, private mediaService: MediaService, private eventService: EventService) {
    // before sending the searchtext to booklist component debounce it
    this.subscriptions.add(this.modelChanged
      .pipe(
        debounceTime(this.milisecToDebounce))
      .subscribe(() => {
        this.searchTextObservable.next(this.searchText);
      }))
  };
  ngOnInit() {
    var now = new Date();

    // get users count;
    let usersList = JSON.parse(localStorage.getItem("users"));
    if (usersList && usersList.length > 0) {
      this.usersCount = usersList.length;
    } else {
      this.usersCount = 0;
    }
    // new media - 24 hours ago
    this.mediaService.user.booksList.forEach(item => {
      // var date = new Date(item.addedDate)
      var date = new Date(new Date(item.addedDate).getTime() + 60 * 60 * 24 * 1000);
      if (date > now) {
        this.newMediaCount++;
      }
    });

    this.mediaService.user.videosList.forEach(item => {
      var date = new Date(new Date(item.addedDate).getTime() + 60 * 60 * 24 * 1000);

      //var dateAdded = date.getMilliseconds();
      if (date > now) {
        this.newMediaCount++;
      }
    });


    // client update of media count

    // listener for user data for openning chat with spesific user directly 
    this.subscriptions.add(this.eventService.on("UPDATE_MEDIA_COUNT", () => {
      this.newMediaCount++;
    }));

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