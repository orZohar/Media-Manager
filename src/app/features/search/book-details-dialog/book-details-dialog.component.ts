import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { EventService } from 'src/app/core/services/event.service';
import { SearchService } from '../services/search.service';
import { MediaService } from 'src/app/core/services/media.service';

@Component({
  selector: 'app-book-details-dialog',
  templateUrl: './book-details-dialog.component.html',
  styleUrls: ['./book-details-dialog.component.scss']
})
export class BookDetailsDialogComponent implements OnInit {
  bookData: any;
  mediaType: string;
  subscriptions: Subscription = new Subscription();
  disableAddButton: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private mediaService: MediaService, private toastrService: ToastrService, private eventService: EventService, private searchService: SearchService) { }

  ngOnInit() {
    this.bookData = this.data.book;
    this.mediaType = this.data.mediaType;
    
    this.disableAddButton = this.data.disableAddButton;

  }

  addToCart() {
    // add book to local storage
    this.mediaService.addBook(this.bookData);

    // broadcast to header to raise items count 
    this.subscriptions.add(this.eventService.BroadcastEvent("CHANGES_CART_COUNT", true));
  }
}
