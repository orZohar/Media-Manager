import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';
import { IsPermittedGuard } from './guards/is-permitted.guard';

const routes: Routes = [
  {
    path: 'welcome',
    component: WelcomePageComponent,
  },
  {
    path: 'search',
    canActivate: [IsPermittedGuard],
    loadChildren: './features/search/search.module#SearchModule'
  },
  {
    path: 'wishList',
    canActivate: [IsPermittedGuard],
    loadChildren: './features/wish-list/wish-list.module#WishListModule'
  },

  { 
    path: '**', 
    redirectTo: '/welcome', 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }