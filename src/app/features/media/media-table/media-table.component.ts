import { Component, OnInit, Input, SimpleChanges, ɵSWITCH_TEMPLATE_REF_FACTORY__POST_R3__ } from '@angular/core';
import { SorterService } from 'src/app/core/services/sorter.service';
import { DatesPipe } from 'src/app/shared/pipes/dates.pipe';

@Component({
  selector: 'media-table',
  templateUrl: './media-table.component.html',
  styleUrls: ['./media-table.component.scss']
})
export class MediaTableComponent implements OnInit {

  @Input() mediaList: any;
  @Input() mediaType: string;

  inputsArray: Object[] = []; // filtering inputs
  displayData: Object[] = [];
  tableData: any = [];
  dataBackup: Object[] = []; // used for filtering the table
  headers: Object[] = []; // consist headers names came from the server and display names 
  toggleSort: boolean = false; // boolean flag for sort direction
  shoppingCart: any[] = [];
  paginationPage: number = 1;
  constructor(private SorterService: SorterService, private datesPipe: DatesPipe) { }

  ngOnChanges(changes: SimpleChanges) {
    this.shoppingCart = this.mediaList;
    var obj = null;
    var tempArray = [];
    this.headers = [];
    this.tableData = [];
    this.displayData = [];
    this.inputsArray = [];

    if (changes.mediaType.currentValue === 'books') {
      // display data
      for (let i = 0; i < this.shoppingCart.length; i++) {
        obj = {
          title: this.shoppingCart[i].volumeInfo.title ? this.shoppingCart[i].volumeInfo.title : "",
          authors: this.shoppingCart[i].volumeInfo.authors ? this.shoppingCart[i].volumeInfo.authors.toString() : "",
          publishedDate: this.shoppingCart[i].volumeInfo.publishedDate ? this.shoppingCart[i].volumeInfo.publishedDate : "",
          pageCount: this.shoppingCart[i].volumeInfo.pageCount ? parseInt(this.shoppingCart[i].volumeInfo.pageCount) : null,
          language: this.shoppingCart[i].volumeInfo.language ? this.shoppingCart[i].volumeInfo.language : "",
        }
        this.tableData.push(obj)
      }
      
      tempArray = this.assignValues();
      // create array of headers which will be passed to table component( contains name and displayName)
      tempArray.forEach(element => {
        if (element === 'title' || element === 'authors' || element === 'publishedDate' || element === 'pageCount' || element === 'language') {
          this.headers.push({ "name": element, "displayName": element.charAt(0).toUpperCase() + element.slice(1) })
        }
      });

    } else {
      for (let i = 0; i < this.shoppingCart.length; i++) {
        obj = {
          title: this.shoppingCart[i].snippet.title ? this.shoppingCart[i].snippet.title : "",
          publishedAt: this.shoppingCart[i].snippet.publishedAt ? this.datesPipe.transform(this.shoppingCart[i].snippet.publishedAt) : "",
          description: this.shoppingCart[i].snippet.description ? this.shoppingCart[i].snippet.description : "",
        }
        this.tableData.push(obj)
      }

      tempArray = this.assignValues();
      // create array of headers which will be passed to table component( contains name and displayName)
      tempArray.forEach(element => {
        if (element === 'title' || element === 'publishedAt' || element === 'description') {
          this.headers.push({ "name": element, "displayName": element.charAt(0).toUpperCase() + element.slice(1) })
        }
      });
    }

  }

  ngOnInit() { }

  assignValues() {
    var tempArray = [];
    this.dataBackup = this.tableData;
    // get headers from server data
    if (this.tableData.length > 0) {
      tempArray = Object.keys(this.tableData[0]);
      // var  data
      for (let i = 0; i < this.tableData.length; i++) {
        this.displayData.push(this.dataBackup[i])
      }
      // add blank inputs for filtering according to number of headers
      for (let i = 0; i < tempArray.length; i++) {
        this.inputsArray.push({ value: '' })
      }
    }
    return tempArray;
  }

  sort(header: string) {
    if (this.tableData.length === 0) {
      return;
    }

    this.toggleSort = !this.toggleSort;
    this.displayData = this.SorterService.sort(header, this.toggleSort, this.tableData);
  }

  filter(filterInputs: any) {
    // fetch all the data before every filter
    this.tableData = this.dataBackup;
    // empty displaydata 
    this.displayData = [];

    // filter the table according to all inputs
    for (let i = 0; i < filterInputs.length; i++) {
      if (this.headers[i]['name']) {
        this.tableData = this.tableData.filter(row => row[this.headers[i]['name']].toString().
          toLowerCase().indexOf(filterInputs[i].value.toLowerCase()) >= 0);
      }
    }
    // assign displayData 
    this.displayData = this.tableData;
  }


}