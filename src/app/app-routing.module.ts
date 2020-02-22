import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';
import { WishListPageComponent } from './components/wish-list-page/wish-list-page.component';
import { IsPermittedGuard } from './guards/is-permitted.guard';


const routes: Routes = [
  {
    path: 'welcome',
    component: WelcomePageComponent,
  },
  {
    path: 'search',
    component: SearchPageComponent,
    canActivate: [IsPermittedGuard] 
  },
  {
    path: 'wishList',
    component: WishListPageComponent,
    canActivate: [IsPermittedGuard] 
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
