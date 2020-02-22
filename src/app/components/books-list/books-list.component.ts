import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { GoogleBooksService } from '../../services/google-books.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { BookDetailsDialogComponent } from '../book-details-dialog/book-details-dialog.component';
import { Book } from '../../interfaces/book.interface';
import { trigger, transition, style, animate } from '@angular/animations';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss'],
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({ transform: 'translateX(100%)', opacity: 0 }),
          animate('400ms', style({ transform: 'translateX(0)', opacity: 1 }))
        ]),
        transition(':leave', [
          style({ transform: 'translateX(0)', opacity: 0 }),
          animate('400ms', style({ transform: 'translateX(100%)', opacity: 0 }))
        ])
      ]
    )
  ],
})

export class BooksListComponent implements OnInit {
  @Input() searchTextObservable: Subject<string>;
  @Input() booksList: Book[] = [];
  @Input() disableDetailsDialog: boolean; // (wishlist)
  @Input() addDeleteButton: boolean; // (wishlist)
  @Input() removeHoverFromBooks: boolean; // (wishlist)

  subscriptions: Subscription = new Subscription();
  dialogRef: MatDialogRef<any>;
  searchText: string;
  paginationPage: number;

  constructor(private googleBooksService: GoogleBooksService, private dialog: MatDialog, private eventService: EventService) { }
  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.searchTextObservable) {
      this.subscriptions.add(this.searchTextObservable.subscribe(result => {
        this.searchText = result;
        // check if there is a text before send request to the server
        if (this.searchText && this.searchText.length > 0) {
          this.searchBooks();
        }
      }));
    }
  }

  searchBooks() {
    this.subscriptions.add(this.googleBooksService.getBooks(this.searchText).subscribe(result => {
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

  getBookDetails(id) {
    // if you are in wish list don't open dialog
    if (this.disableDetailsDialog) {
      return;
    }

    // bookdata for opening the dialog window 
    var bookData = null;
    this.booksList.forEach(element => {
      if (element.id === id) {
        bookData = element;
      }
    });

    this.dialogRef = this.dialog.open(BookDetailsDialogComponent, {
      width: '700px',
      height: '700px',
      autoFocus: false,
      data: {
        book: bookData,
      }
    });
  }

  deleteBook(id) {
    this.dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      disableClose: true,
      data: {
        title: "Delete this book from Wishlist?",
      }
    })

    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        for (let i = 0; i < this.booksList.length; i++) {
          if (this.booksList[i].id === id) {
            this.booksList.splice(id, 1);
            // broadcast to header
            this.subscriptions.add(this.eventService.BroadcastEvent("CHANGES_CART_COUNT", false));
            break;
          }
        }
      }
      this.dialogRef = null;
    });
  }

  trackByBooksListFunction(index, item) {
    if (!item) {
      return null;
    }
    return item.id;
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
