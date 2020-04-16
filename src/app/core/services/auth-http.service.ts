import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { throwError, EMPTY, of } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthHttpService {
  loginMsg: string;
  signUpMsg = "The user has been signed successfully";
  constructor(private http: HttpClient, private router: Router, private toastrService: ToastrService) { }

  login(username, password) {

    if (localStorage.getItem('users')) {
      var users = JSON.parse(localStorage.getItem("users") || "[]");

      var user = users.find(x => x.userData.username === username && x.userData.password === password);

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
    if (users.find(elem => elem.username === userData.username)) {
      return throwError({ error: { msg: 'Username "' + userData.username + '" is already taken' } });
    } else {
      var user = {
        userData: userData,
        booksList: [],
        videosList: []
      }
      users.push(user);
    }
    this.updateLocalStorage(users, 'users');
    return of(new HttpResponse({ status: 200 }))
  }

  updateLocalStorage(list, item) {
    // update local storage
    localStorage.setItem(item, JSON.stringify(list));
    // respond 200 OK
    return of(new HttpResponse({ status: 200 }));
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

