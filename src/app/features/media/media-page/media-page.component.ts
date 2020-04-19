import { Component, OnInit, ɵConsole } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MediaService } from 'src/app/core/services/media.service';


@Component({
  selector: 'app-media-page',
  templateUrl: './media-page.component.html',
  styleUrls: ['./media-page.component.scss']
})
export class MediaPageComponent implements OnInit {

  mediaList: any[] = [];
  constructor(private activatedRoute: ActivatedRoute, private mediaService: MediaService) { }
  isTable: boolean;
  mediaType: string;
  ngOnInit() {

    // check if it's change or restore (relevant only for yellow and green)
    this.activatedRoute.queryParams.subscribe(result => {
      this.isTable = result.isTable;
    });
    // check if it's change or restore (relevant only for yellow and green)
    this.activatedRoute.params.subscribe(result => {
      this.mediaType = result.media;
      if (localStorage.getItem('users')) {
        var usersList = JSON.parse(localStorage.getItem("users"));
      }
      var user = usersList.find(user => user.userData.username === this.mediaService.user.userData.username);

      if(this.mediaType === 'books'){
        this.mediaList = user.booksList;
      }else{
        this.mediaList = user.videosList;
      }
    });
    }
}