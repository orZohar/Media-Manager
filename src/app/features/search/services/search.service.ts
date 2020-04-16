import { Injectable } from '@angular/core';
import { Book } from 'src/app/shared/interfaces/book.interface';
import { WishListHttpService } from 'src/app/core/services/wish-list-http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private wishListHttpService : WishListHttpService) { }

  addBook(book: any, username: string): Observable<any> {
    return this.wishListHttpService.addBook(book, username);
  }

  
}
