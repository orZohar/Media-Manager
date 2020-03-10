import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import { throwError, EMPTY, of } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class GoogleBooksService {
  isLoggedIn: boolean;

  constructor(private http: HttpClient) { }

  public getBooks(searchText) {
    return this.http.get<Object>("https://www.googleapis.com/books/v1/volumes?q=" + searchText + "&maxResults=20"
    ).pipe(map((response: any) => response.items)).
      catch((err) => {
        // Do messaging and error handling here
        console.error(err);
        let propogateError = false;
        if (propogateError) {
          // Send the error to the calling service
          return throwError(err);
        } else {
          // Stop propogation - return empty observable
          return EMPTY;
        }
      });
  }

  isUserLoggedIn() {
    return this.isLoggedIn;
  }

  login(request) {
    // save user added in session
    sessionStorage.setItem('user', JSON.stringify(request.username));
    // respond 200 OK
    return of(new HttpResponse({ status: 200 }));
  }

  updateWishList(book) {
    let cart = [];
    // get current wish list from local storage
    if (localStorage.getItem('cart')) {
      cart = JSON.parse(localStorage.getItem('cart')) || [];
    }

    // push new book 
    cart.push(book);
    // update local storage
    localStorage.setItem('cart', JSON.stringify(cart));

    // respond 200 OK
    return of(new HttpResponse({ status: 200 }));
  }
}