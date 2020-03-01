import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';
import { SideNavBarComponent } from './components/side-nav-bar/side-nav-bar.component';
import { HeaderBarComponent } from './components/header-bar/header-bar.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { IsPermittedGuard } from './guards/is-permitted.guard';
import { ToastrModule } from 'ngx-toastr';
import { SearchModule } from './features/search/search.module';
import { WishListModule } from './features/wish-list/wish-list.module';
import { SharedModule } from './shared/shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    SideNavBarComponent,
    HeaderBarComponent,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    SearchModule,
    SharedModule,
    WishListModule,
    ToastrModule.forRoot({
      timeOut: 1000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true
    }) // ToastrModule added
  ],
  providers: [IsPermittedGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
