import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchRoutingModule } from './search-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { SearchPageComponent } from './search-page/search-page.component';


@NgModule({
  declarations: [SearchPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    SearchRoutingModule,
    SharedModule
  ]
})
export class SearchModule { }
