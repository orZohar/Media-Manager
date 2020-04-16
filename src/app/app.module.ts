import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { IsPermittedGuard } from './shared/guards/is-permitted.guard';
import { HeaderBarComponent } from './core/header-bar/header-bar.component';
import { SharedModule } from './shared/shared.module';
import { BlockUIModule } from 'ng-block-ui';
import { BlockUIHttpModule } from 'ng-block-ui/http';
import { SideNavBarComponent } from './core/side-nav-bar/side-nav-bar.component';
import { DatesPipe } from './shared/pipes/dates.pipe';
import { BsDropdownModule } from 'ngx-bootstrap';
import { HttpInterceptorsService } from './core/interceptors/http-interceptors.service';

/**
 * Block UI filter functions
 */
const requestFilters = [
  { method: "GET", url: /https:www.googleapis.com\/books\/*\//},
];

// Needs to be exported for AOT
export function filter(req: HttpRequest<any>): boolean {
  return requestFilters.some(({ method, url }: { method: string, url: RegExp }) => {
    return req.method === method && url.test(req.url);
  });
}


@NgModule({
  declarations: [
    AppComponent,
    SideNavBarComponent,
    HeaderBarComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    BlockUIModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    SharedModule,
    // Block UI
    BlockUIModule.forRoot({
      // delayStart: 500,
      // delayStop: 500
    }),
    BlockUIHttpModule.forRoot({
      requestFilters: [filter],
      blockAllRequestsInProgress: true
    }),
  ],
  providers: [IsPermittedGuard, DatesPipe,
     {provide: HTTP_INTERCEPTORS, useClass : HttpInterceptorsService, multi:true}
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
