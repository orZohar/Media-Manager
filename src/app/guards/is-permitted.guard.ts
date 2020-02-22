import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GoogleBooksService } from '../services/google-books.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class IsPermittedGuard implements CanActivate {

  constructor(private googleBooksService: GoogleBooksService, private router: Router, private toastrService: ToastrService) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // if user isn't logged in go back to welcome page
    if (this.googleBooksService.isUserLoggedIn()) {
      return true;
    } else {
      // if user try to access a page without logging in navigate back to welcome page
      this.toastrService.error("You need to login to access this page.");
      this.router.navigate(["/welcome"]);
      return false;
    }
  }
}