import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { trigger, transition, style, animate } from '@angular/animations';
import { MediaService } from 'src/app/core/services/media.service';
import { EventService } from '../services/event.service';
import { faKey } from '@fortawesome/free-solid-svg-icons';

class ImageSnippet {
  constructor(public src: string, public file: File) { }
}
@Component({
  selector: 'side-nav-bar',
  templateUrl: './side-nav-bar.component.html',
  styleUrls: ['./side-nav-bar.component.scss'],
})
export class SideNavBarComponent implements OnInit {
  isLoggedIn: boolean;
  subscriptions: Subscription = new Subscription();
  username: string;
  faKey = faKey;
  selectedFile: ImageSnippet = {
    src: null,
    file: null
  };

  constructor(private router: Router, private mediaService: MediaService, private eventService: EventService) { }
  ngOnInit() {
    // if the user is logged in and navigation ended open media and SearchPage tabs
    this.subscriptions.add(this.router.events.subscribe((event: any) => {
      if (this.mediaService.isUserLoggedIn() && event instanceof NavigationEnd) {
        this.isLoggedIn = true;
      };
    }));
    // listener for user data for openning chat with spesific user directly 
    this.subscriptions.add(this.eventService.on("SHOW_LOGGED_USER", (user: any) => {
      this.username = this.mediaService.user.userData.username;
      if (this.mediaService.user.profilePic.src) {
        this.selectedFile = this.mediaService.user.profilePic;
      } else {
        this.selectedFile.src = "/assets/images/no-profile-picture.jpg"
      }
    }));
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
      this.uploadImage(this.selectedFile.file);
    })
    reader.readAsDataURL(file);
  }

  uploadImage(image: File) {
    this.mediaService.setProfilePicture(this.selectedFile);
  }
}