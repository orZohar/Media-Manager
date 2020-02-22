import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import { throwError, EMPTY } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class GoogleBooksService {
  isLoggedIn: boolean;  
  userName : string;
  shoppingCart: Object[] = [];

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
 
  getUserName(){  
    return this.userName;
  }
  setUserName(name){  
    this.userName = name;
  }

  isUserLoggedIn(){ 
    return this.isLoggedIn;
  }
  setLogin(loggedIn){
    this.isLoggedIn = loggedIn;
  }
  getShoppingCart(){ 
      return this.shoppingCart;
  }
}
