import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { WishListPageComponent } from './components/wish-list-page/wish-list-page.component';
import { SideNavBarComponent } from './components/side-nav-bar/side-nav-bar.component';
import { HeaderBarComponent } from './components/header-bar/header-bar.component';
import { FormsModule } from '@angular/forms';
import { BooksListComponent } from './components/books-list/books-list.component';
import { BookComponent } from './components/book/book.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { BookDetailsDialogComponent } from './components/book-details-dialog/book-details-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { MatDialogModule, MatCardModule, MatButtonModule } from '@angular/material';
import { ValidationMessagesComponent } from './components/validation-messages/validation-messages.component';
import { IsPermittedGuard } from './guards/is-permitted.guard';
import { ToastrModule } from 'ngx-toastr';
import { FormSubmitDirective } from './directives/form-submit.directive';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';


@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    WishListPageComponent,
    SearchPageComponent,
    SideNavBarComponent,
    HeaderBarComponent,
    BooksListComponent,
    BookComponent,
    BookDetailsDialogComponent,
    ValidationMessagesComponent,
    FormSubmitDirective,
    ConfirmationDialogComponent,
    SearchBarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    MatDialogModule,
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    ToastrModule.forRoot({
      timeOut: 1000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true
    }) // ToastrModule added
  ],
  providers: [IsPermittedGuard],
  entryComponents: [BookDetailsDialogComponent,ConfirmationDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
