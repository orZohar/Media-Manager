import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormGroupDirective, FormBuilder, Validators, NgModel } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { EventService } from 'src/app/core/services/event.service';
import { MediaService } from 'src/app/core/services/media.service';
import { faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faPhotoVideo } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('bookForm', { static: true }) bookForm: FormGroupDirective;;

  username: string;
  password: string;
  submitted = false;
  subscriptions: Subscription = new Subscription();
  faUserFriends = faUserFriends;
  faEnvelope = faEnvelope; 
  faPhotoVideo = faPhotoVideo;
  usersCount: number;

  constructor(private router: Router, private mediaService: MediaService, private authService: AuthService, private toastrService: ToastrService, private eventService: EventService) { }
  ngOnInit() {
    // get users count;
    let usersList = JSON.parse(localStorage.getItem("users"));
    this.usersCount = usersList.length;
  }

  signIn() {

    // check if the form is valid
    if (!this.bookForm.valid) {
      return;
    }
    this.authService.login(this.username, this.password).subscribe(
      data => {
        if (data.status === 404) {
          this.toastrService.error('Username or password is incorrect');
        } else {
          this.mediaService.isLoggedIn = true;
          this.toastrService.success('Logged in successfully');
          this.subscriptions.add(this.eventService.BroadcastEvent("SHOW_LOGGED_USER", { username: this.username, profilePic: this.mediaService.user.profilePic }));
          this.mediaService.user.userData.username = this.username;
          this.router.navigate(['search']);
        }
      }, error => {
        this.toastrService.error(error.msg);
      });

    // server preperation ///////////////////////////////////////

    // check if username exits in local storage - go straight to search page
    //else login process
    // this.authService.login(this.username, this.password).subscribe(result => { 
    //   this.loginResult(result);
    // });
    // login with session 
    //temp
    //temporary
  }


  loginResult(result) {

    if (result === "username doesn't exist") {
      this.toastrService.error("Username doesn't exist")
    }
    else if (result === "wrong password") {
      this.toastrService.error("Wrong password")
    }
    else if (result === "login successfully") {
      // update service user is logged in
      this.mediaService.isLoggedIn = true;
      this.router.navigate(['search']);
    }
  }
}