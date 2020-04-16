import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorsService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headers = new HttpHeaders({ 
      'Authorization': 'orzo'
    });

    const clone = req.clone ({ 
      headers: headers
    })
    return next.handle(req).pipe(
      catchError(this.handleError))


  }

handleError(error: HttpErrorResponse){
  console.log("error occured");
  return throwError(error);
}


}
