import { Component, OnInit, Inject } from '@angular/core';
import { Video } from 'src/app/shared/interfaces/video.interface';
import { MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { EventService } from 'src/app/core/services/event.service';
import { SearchService } from '../services/search.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MediaService } from 'src/app/core/services/media.service';

@Component({
  selector: 'app-video-dialog',
  templateUrl: './video-dialog.component.html',
  styleUrls: ['./video-dialog.component.scss']
})
export class VideoDialogComponent implements OnInit {

  videoData: Video;
  videoUrl: string;
  mediaType: string;
  disableAddButton: boolean;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, private sanitizer: DomSanitizer,
    private mediaService: MediaService, private searchService: SearchService) { }

  ngOnInit() {
    this.videoData = this.data.video;
    this.mediaType = this.data.mediaType;
    this.disableAddButton = this.data.disableAddButton;
    this.videoUrl = "https://www.youtube.com/embed/" + this.videoData.id.videoId + "?ecver=2"
  }

  addToCart() {
    // add wishlist to local storage
    this.mediaService.addVideo(this.videoData);
  }

  getEmbedUrl() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.videoUrl);
  }
}
