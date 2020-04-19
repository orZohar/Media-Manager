import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import { throwError, EMPTY, of, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/shared/interfaces/user.interface';
@Injectable({
  providedIn: 'root'
})
export class MediaService {
  isLoggedIn: boolean;
  booksList;
  videosList;
  username;
  user: User;
  subscriptions: Subscription = new Subscription();

  constructor(private http: HttpClient, private toastrService: ToastrService) { }

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
  getVideos(searchText) {
    return this.http.get<Object>("https://www.googleapis.com/youtube/v3/search?key=AIzaSyA7yRGH7wSQ190MgYsLeSaZq94FlOuV3cE&order=relevance&part=snippet%20&type=video,id&" +
      "maxResults=20&q=" + searchText
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

  addBook(book) {
    let usersList = [];
    // get current wish list from local storage
    if (localStorage.getItem('users')) {
      usersList = JSON.parse(localStorage.getItem("users"));
    }
    var index = usersList.findIndex(item => item.userData.username === this.user.userData.username);
    console.log(index)
    if ((usersList[index].booksList.findIndex(elem => elem.id === book.id)) >= 0) {
      this.toastrService.error('Book is already exists');
      return;
    } else {
      usersList[index].booksList.push(book);
      // update client
      this.user.booksList.push(book);
      this.toastrService.success("Item added to book list");
    }
    localStorage.setItem("users", JSON.stringify(usersList));
  }

  addVideo(video) {
    let usersList = [];

    // get current wish list from local storage
    if (localStorage.getItem('users')) {
      usersList = JSON.parse(localStorage.getItem("users"));
    }
    var index = usersList.findIndex(item => item.userData.username === this.user.userData.username);
    if ((usersList[index].videosList.findIndex(elem => elem.id.videoId === video.id.videoId)) >= 0) {
      this.toastrService.error('Video is already exists');
      return;
    } else {
      usersList[index].videosList.push(video);
      // update service
      this.user.videosList.push(video);
      this.toastrService.success("Item added to video list");
    }
    localStorage.setItem("users", JSON.stringify(usersList));
  }

  deleteBook(book) {
    let usersList = [];
    // get current wish list from local storage
    if (localStorage.getItem('users')) {
      usersList = JSON.parse(localStorage.getItem("users"));
    }
    var userIndex = usersList.findIndex(item => item.userData.username === this.user.userData.username);
    // get index for remove an item
    var bookIndex = usersList[userIndex].booksList.findIndex(elem => elem.id === book.id);

    usersList[userIndex].booksList.splice(bookIndex, 1);
     // update service
    this.user.booksList.splice(bookIndex, 1);
    localStorage.setItem("users", JSON.stringify(usersList));
  }

  deleteVideo(video) {
    let usersList = [];
    // get current wish list from local storage
    if (localStorage.getItem('users')) {
      usersList = JSON.parse(localStorage.getItem("users"));
    }
    var userIndex = usersList.findIndex(item => item.userData.username === this.user.userData.username);
    // get index for remove an item
    var videoIndex = usersList[userIndex].videosList.findIndex(elem => elem.id.videoId === video.id.videoId);
    usersList[userIndex].videosList.splice(videoIndex, 1);
     // update service
    this.user.videosList.splice(videoIndex, 1);
    localStorage.setItem("users", JSON.stringify(usersList));
  }
  
  setProfilePicture(profilePic){
    let usersList = [];
    // get current wish list from local storage
    if (localStorage.getItem('users')) {
      usersList = JSON.parse(localStorage.getItem("users"));
    }
    var index = usersList.findIndex(item => item.userData.username === this.user.userData.username);
    usersList[index].profilePic = profilePic;
    // update service
    this.user.profilePic = profilePic;
    this.toastrService.success("Profile picture changed successfully");
    localStorage.setItem("users", JSON.stringify(usersList));
  }
}