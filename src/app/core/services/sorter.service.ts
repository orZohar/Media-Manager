import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SorterService {

  constructor() { }


  sort(header: string, toggleSort, array) {
    // check type of requests items to sort 
    let sortingType = typeof (array[0][header['name']]);

    switch (sortingType) {
      case 'string':
        // make all names lower case 
        array.forEach(element => {
          element[header['name']] = element[header['name']].toString().toLowerCase();

        });
      
        // if it's 'moment' date string 
        if (header['name'] === 'publishedAt') {
          array.sort((a: Object, b: Object) => {
            if (new Date(b[header['name']]) > new Date(a[header['name']])) { return 1 }
            if (new Date(b[header['name']]) < new Date(a[header['name']])) { return -1 }
            else { return 0 }
          });
        } else {
          array.sort((a: Object, b: Object) => {
            if (b[header['name']] > a[header['name']]) { return 1 }
            if (b[header['name']] < a[header['name']]) { return -1 }
            else { return 0 }
          });
        }

        break;

      case 'number':
        array.sort((a, b) => { return a[header['name']] - b[header['name']] });
        break;
    }

    if (!toggleSort) {
      array.reverse();
    }
    // toggle directions
    toggleSort = !toggleSort;
    return array;
  }
}
