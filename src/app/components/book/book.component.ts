import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Book } from '../../interfaces/book.interface';

@Component({
  selector: 'book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class BookComponent implements OnInit {
  @Input() bookData: Book;
  constructor() { }


  ngOnInit() {
  }
}