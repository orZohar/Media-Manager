import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { throwError, EMPTY, of } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NullTemplateVisitor } from '@angular/compiler';
import { MediaService } from './media.service';

@Injectable({
  providedIn: 'root'
})
export class AuthHttpService {
  loginMsg: string;
  signUpMsg = "The user has been signed successfully";
  constructor(private http: HttpClient, private router: Router, private mediaService: MediaService) { }

  login(username, password) {
    if (localStorage.getItem('users')) {
      var users = JSON.parse(localStorage.getItem("users") || "[]");
      var user = users.find(x => x.userData.username === username && x.userData.password === password);
      this.mediaService.user = user; // update service
      if (!user) {
        return throwError({ msg: "Incorrect username or password" });
      } else {
        return of(new HttpResponse({ status: 200 }))
      }
    } else {
      return throwError({ msg: "Incorrect username or password" });
    }
  }

  signUp(userData) {
    let users = [];
    // get current wish list from local storage
    if (localStorage.getItem('users')) {
      users = JSON.parse(localStorage.getItem("users") || "[]");
    }

    if (users.find(elem => elem.userData.username === userData.username)) {

      return throwError({ error: { msg: 'Username "' + userData.username + '" is already taken' } });
    } else {
      var user = {
        profilePic: null,
        userData: userData,
        booksList: [],
        videosList: []
      }
      users.push(user);

      this.updateLocalStorage(users, 'users');
      return of(new HttpResponse({ status: 200 }))
    }
  }

  updateLocalStorage(list, item) {
    // update local storage
    localStorage.setItem(item, JSON.stringify(list));
    // respond 200 OK
    return of(new HttpResponse({ status: 200 }));
  }

  editProfile(user) {
    let users = [];
    // get current wish list from local storage
    if (localStorage.getItem('users')) {
      users = JSON.parse(localStorage.getItem("users") || "[]");
    }
    var index = users.findIndex(elem => elem.userData.username === user.userData.username);
    users[index] = user;
    this.mediaService.user = user; // update service
    this.updateLocalStorage(users, 'users');
    return of(new HttpResponse({ status: 200 }))
}


  public serialize(obj: any): HttpParams {
  let params: HttpParams = new HttpParams();
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      var element = obj[key];
      params = params.set(key, element);
    }
  }
  return params;
}
}

