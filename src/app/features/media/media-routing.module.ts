import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MediaPageComponent } from './media-page/media-page.component';


const routes: Routes = [
  {
    path: ':media', // passing type of media with path params
    component: MediaPageComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MediaRoutingModule { }
