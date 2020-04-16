import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormSubmitDirective } from 'src/app/shared/directives/form-submit.directive';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatDialogModule, MatCardModule, MatButtonModule } from '@angular/material';
import { ToastrModule } from 'ngx-toastr';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { SearchBarComponent } from 'src/app/features/search/search-bar/search-bar.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { ValidationMessagesComponent } from './components/validation-messages/validation-messages.component';
import { MediaListComponent } from '../features/search/media-list/media-list.component';
import { BookComponent } from '../features/search/book/book.component';
import { BookDetailsDialogComponent } from '../features/search/book-details-dialog/book-details-dialog.component';
import { AlertModule } from 'ngx-bootstrap';
import {AccordionModule} from 'primeng/accordion';     //accordion and accordion tab
import {MenuItem} from 'primeng/api';                  //api
import {TableModule} from 'primeng/table';
import { ChartsModule } from 'ng2-charts';
import {InputTextModule} from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';
import { VideoComponent } from '../features/search/video/video.component';
import { DatesPipe } from './pipes/dates.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { VideoDialogComponent } from '../features/search/video-dialog/video-dialog.component';
// or
// import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
@NgModule({
  declarations: [
    MediaListComponent,
    BookComponent,
    VideoComponent,
    BookDetailsDialogComponent,
    VideoDialogComponent,
    ValidationMessagesComponent,
    FormSubmitDirective,
    ConfirmationDialogComponent,
    SearchBarComponent,
    CapitalizePipe,
    DatesPipe
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
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 1000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true
    }), // ToastrModule added
    AlertModule,
    AccordionModule,
    TableModule,
    ChartsModule,
    InputTextModule,
    DropdownModule,
    FontAwesomeModule,
    // BsDropdownModule.forRoot(),
    
  ],
  exports: [
    
    CommonModule,
    ReactiveFormsModule,
    MediaListComponent,
    BookComponent,
    VideoComponent,
    BookDetailsDialogComponent,
    VideoDialogComponent,
    ValidationMessagesComponent,
    FormSubmitDirective,
    ConfirmationDialogComponent,
    SearchBarComponent,
    CapitalizePipe,
    DatesPipe,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    MatDialogModule,
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    AlertModule,
    AccordionModule,
    TableModule,
    ChartsModule,
    InputTextModule,
    DropdownModule,
    FontAwesomeModule,
    ],
  entryComponents: [BookDetailsDialogComponent,VideoDialogComponent, ConfirmationDialogComponent],

})
export class SharedModule { }
