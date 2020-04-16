import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { MediaService } from 'src/app/core/services/media.service';

@Injectable({
  providedIn: 'root'
})
export class IsPermittedGuard implements CanActivate {

  constructor(private mediaService: MediaService, private router: Router, private toastrService: ToastrService) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // if user isn't logged in go back to welcome page
    if (this.mediaService.isUserLoggedIn()) {
      return true;
    } else {
      // if user try to access a page without logging in navigate back to welcome page
      this.toastrService.error("You need to login to access this page.");
      this.router.navigate(["/login"]);
      return false;
    }
  }
}