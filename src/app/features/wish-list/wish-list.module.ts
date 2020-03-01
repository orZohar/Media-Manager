import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishListRoutingModule } from './wish-list-routing.module';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { WishListPageComponent } from './wish-list-page/wish-list-page.component';


@NgModule({
  declarations: [WishListPageComponent ],
  imports: [
    CommonModule,
    WishListRoutingModule,
    SharedModule
  ]
})
export class WishListModule { }
