import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'my-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush

})
export class VideoComponent implements OnInit {
  @Input() videoData: any;

  constructor() { }

  ngOnInit() {
  }

}
