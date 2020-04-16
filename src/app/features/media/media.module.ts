import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaRoutingModule } from './media-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SearchModule } from '../search/search.module';
import { MediaPageComponent } from './media-page/media-page.component';
import { MediaTableComponent } from './media-table/media-table.component';
import { MediaTableRowComponent } from './media-table-row/media-table-row.component';



@NgModule({
  declarations: [MediaPageComponent, MediaTableComponent, MediaTableRowComponent ],
  imports: [
    CommonModule,
    MediaRoutingModule,
    SharedModule,
    SearchModule
  ]
})
export class MediaModule { }
