import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wish-list-page',
  templateUrl: './wish-list-page.component.html',
  styleUrls: ['./wish-list-page.component.scss']
})
export class WishListPageComponent implements OnInit {
  shoppingCart: Object[] = [];
  constructor() { }
  ngOnInit() {
    this.shoppingCart = JSON.parse(localStorage.getItem("cart") || "[]"); 
  }
}