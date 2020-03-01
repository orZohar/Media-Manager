import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksListComponent } from 'src/app/components/books-list/books-list.component';
import { BookComponent } from 'src/app/components/book/book.component';
import { BookDetailsDialogComponent } from 'src/app/components/book-details-dialog/book-details-dialog.component';
import { ValidationMessagesComponent } from 'src/app/components/validation-messages/validation-messages.component';
import { FormSubmitDirective } from 'src/app/directives/form-submit.directive';
import { ConfirmationDialogComponent } from 'src/app/components/confirmation-dialog/confirmation-dialog.component';
import { SearchBarComponent } from 'src/app/components/search-bar/search-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatDialogModule, MatCardModule, MatButtonModule } from '@angular/material';
import { SearchModule } from 'src/app/features/search/search.module';
import { WishListModule } from 'src/app/features/wish-list/wish-list.module';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    BooksListComponent,
    BookComponent,
    BookDetailsDialogComponent,
    ValidationMessagesComponent,
    FormSubmitDirective,
    ConfirmationDialogComponent,
    SearchBarComponent
  ],
  imports: [
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
  exports: [
    CommonModule,
    BooksListComponent,
    BookComponent,
    BookDetailsDialogComponent,
    ValidationMessagesComponent,
    FormSubmitDirective,
    ConfirmationDialogComponent,
    SearchBarComponent,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    MatDialogModule,
    MatCardModule,
    MatDialogModule,
    MatButtonModule,

    SearchBarComponent],
  entryComponents: [BookDetailsDialogComponent,ConfirmationDialogComponent],

})
export class SharedModule { }
