import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material';
import { BookDetailsDialogComponent } from '../book-details-dialog/book-details-dialog.component';
import { trigger, transition, style, animate } from '@angular/animations';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { Book } from 'src/app/shared/interfaces/book.interface';
import { EventService } from 'src/app/core/services/event.service';
import { Video } from 'src/app/shared/interfaces/video.interface';
import { VideoDialogComponent } from '../video-dialog/video-dialog.component';
import { MediaService } from 'src/app/core/services/media.service';

@Component({
  selector: 'media-list',
  templateUrl: './media-list.component.html',
  styleUrls: ['./media-list.component.scss'],
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({ transform: 'translateX(100%)', opacity: 0 }),
          animate('400ms', style({ transform: 'translateX(0)', opacity: 1 }))
        ]),
        transition(':leave', [
          style({ transform: 'translateX(0)', opacity: 0 }),
          animate('50ms', style({ transform: 'translateX(100%)', opacity: 0 }))
        ])
      ]
    )
  ],
})

export class MediaListComponent implements OnInit {
  @Input() searchTextObservable: Subject<string>;
  @Input() booksList: Book[] = [];
  @Input() videosList: Video[] = [];
  @Input() mediaList: any[] = [];
  @Input() disableAddButton: boolean; // (bookslist)
  @Input() addDeleteButton: boolean; // (bookslist)
  @Input() removeHoverFromBooks: boolean; // (bookslist)
  @Input() mediaType: string; // (bookslist)

  subscriptions: Subscription = new Subscription();
  dialogRef: MatDialogRef<any>;
  searchText: string;
  paginationPage: number;
  constructor(private mediaService: MediaService, private dialog: MatDialog, private eventService: EventService) { }
  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.searchTextObservable) {
      this.subscriptions.add(this.searchTextObservable.subscribe(result => {
        this.searchText = result;
        // check if there is a text before send request to the server
        if (this.searchText && this.searchText.length > 0) {
          this.mediaType === 'books' ? this.searchBooks() : this.searchVideos();
        }
      }));
    }
    // update mediaList according to type of media 
    if (changes.mediaList && changes.mediaList.currentValue.length > 0 && changes.mediaType.currentValue === 'books') {
      this.booksList = changes.mediaList.currentValue;
    }
    if (changes.mediaList && changes.mediaList.currentValue.length > 0 && changes.mediaType.currentValue === 'videos') {
      this.videosList = changes.mediaList.currentValue;
    }
  }

  searchBooks() {
    this.subscriptions.add(this.mediaService.getBooks(this.searchText).subscribe(result => {
      // if server didn't return anything booklist will be empty 
      if (result) {

        this.booksList = result;
        // return to first page 
        this.paginationPage = 1;
      } else {
        this.booksList = [];
      }
    }));
  }

  searchVideos() {
    this.subscriptions.add(this.mediaService.getVideos(this.searchText).subscribe(result => {
      // if server didn't return anything booklist will be empty 
      if (result) {

        this.videosList = result;
        // return to first page 
        this.paginationPage = 1;
      } else {
        this.videosList = [];
      }
    }));
  }

  openMediaDialog(id) {
    // data for opening the dialog window   
    var mediaData = null;
    if (this.mediaType === 'videos') {
      this.videosList.forEach(element => {
        if (element.id.videoId === id) {

          mediaData = element;
        }
      });
      this.dialogRef = this.dialog.open(VideoDialogComponent, {
        width: '500px',
        height: '450px',
        autoFocus: false,
        data: {
          video: mediaData,
          disableAddButton: this.disableAddButton,
          mediaType: this.mediaType
        }
      });
    } else {
      this.booksList.forEach(element => {
        if (element.id === id) {
          mediaData = element;
        }
      });
      this.dialogRef = this.dialog.open(BookDetailsDialogComponent, {
        width: '700px',
        height: '700px',
        autoFocus: false,
        data: {
          book: mediaData,
          disableAddButton: this.disableAddButton,
          mediaType: this.mediaType
        }
      });
    }
  }

  deleteMedia(media) {
    this.dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      disableClose: true,
      data: {
        title: this.mediaType === 'books' ? "Delete this book from book list?" : "Delete this video from video list?",
      }
    })

    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // delete book or video 
        if (this.mediaType === 'books') {
          this.mediaService.deleteBook(media);
          var index = this.booksList.findIndex(elem => elem.id === media.id);
          if (index >= 0) {
            // delete in client
            this.booksList.splice(index, 1);
            // broadcast to header
            // this.subscriptions.add(this.eventService.BroadcastEvent("CHANGES_CART_COUNT", false));
          }
        } else {
          this.mediaService.deleteVideo(media);
          var index = this.videosList.findIndex(elem => elem.id.videoId === media.id.videoId);
          if (index >= 0) {
            // delete in client
            this.videosList.splice(index, 1);
          }
        }
      }
      this.dialogRef = null;
    })
  }

  trackByBooksListFunction(index, item) {
    if (!item) {
      return null;
    }
    return item.id;
  }

  trackByVideosListFunction(index, item) {
    if (!item) {
      return null;
    }
    return item.id.videoId;
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
