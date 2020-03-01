import { Component, OnInit } from '@angular/core';
import { GoogleBooksService } from 'src/app/services/google-books.service';

@Component({
  selector: 'app-wish-list-page',
  templateUrl: './wish-list-page.component.html',
  styleUrls: ['./wish-list-page.component.scss']
})
export class WishListPageComponent implements OnInit {
  shoppingCart: Object[] = [];
  constructor(private googleBooksService : GoogleBooksService) { }
  ngOnInit() {
    this.shoppingCart = this.googleBooksService.getShoppingCart();
  }
}