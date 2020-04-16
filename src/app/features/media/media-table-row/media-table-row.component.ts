import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'media-row',
  templateUrl: './media-table-row.component.html',
  styleUrls: ['./media-table-row.component.scss']
})
export class MediaTableRowComponent implements OnInit {

  @Input() entity: any;
  @Input() rowNumber: number;
  @Input() headers: Object[];

  selected: boolean = false;
  row: string[] = [];
  color: string;

  constructor() { }

  ngOnInit() {
    if (!this.entity) {
      return;
    }
    // build rows
    this.headers.forEach(header => {
      this.row.push(this.entity[header['name']])
    })
  }
}
