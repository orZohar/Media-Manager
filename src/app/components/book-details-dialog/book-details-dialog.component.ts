import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { GoogleBooksService } from '../../services/google-books.service';
import { Book } from '../../interfaces/book.interface';
import { ToastrService } from 'ngx-toastr';
import { EventService } from '../../services/event.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-book-details-dialog',
  templateUrl: './book-details-dialog.component.html',
  styleUrls: ['./book-details-dialog.component.scss']
})
export class BookDetailsDialogComponent implements OnInit {
  bookData: Book;
  subscriptions: Subscription = new Subscription();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private googleBooksService: GoogleBooksService, private toastrService: ToastrService, private eventService: EventService) { }

  ngOnInit() {
    this.bookData = this.data.book;
  }
  addToCart() {
    // add wishlist to local storage
    this.googleBooksService.updateWishList(this.bookData);

    this.toastrService.success("Item added to Wishlist");
    // broadcast to header to raise items count 
    this.subscriptions.add(this.eventService.BroadcastEvent("CHANGES_CART_COUNT", true));
  }
}
