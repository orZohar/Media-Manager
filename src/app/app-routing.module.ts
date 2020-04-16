import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IsPermittedGuard } from './shared/guards/is-permitted.guard';


const routes: Routes = [
  {
    path: 'auth',
    loadChildren: './features/authentication/authentication.module#AuthenticationModule'
  },
  {
    path: 'search',
    canActivate: [IsPermittedGuard],
    loadChildren: './features/search/search.module#SearchModule'
  },
  {
    path: 'media',
    canActivate: [IsPermittedGuard],
    loadChildren: './features/media/media.module#MediaModule'
  },
  {
    path: 'statistics',
    canActivate: [IsPermittedGuard],
    loadChildren: './features/statistics/statistics.module#StatisticsModule'
  },
  {
    path: '**',
    redirectTo: '/auth',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }