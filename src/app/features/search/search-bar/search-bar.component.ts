import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  @Output() searchTextEmitter: EventEmitter<string> = new EventEmitter<string>();
  searchText: string; 
  constructor() { }

  ngOnInit() {
  }

  changed(searchText){
    this.searchTextEmitter.emit(searchText);
  }
}
