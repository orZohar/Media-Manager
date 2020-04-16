import { Injectable } from '@angular/core';
import { Book } from 'src/app/shared/interfaces/book.interface';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { throwError, EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishListHttpService {

  constructor(private http: HttpClient, private router: Router) { }


  public addBook(book: Book, username: string) {
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.post<any>("http://localhost:8081/MyMediaManager/webapi/books/add", book, options).pipe(
      map((response: any) => response)).
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
}
