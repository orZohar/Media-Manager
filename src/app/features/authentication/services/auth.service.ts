import { Injectable } from '@angular/core';
import { AuthHttpService } from 'src/app/core/services/auth-http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private authHttpService : AuthHttpService) { }

  login(username: string, password: string): Observable<any> {
    return this.authHttpService.login(username, password);
  }

  signUp(user: any): Observable<any> {
    return this.authHttpService.signUp(user);
  }


}
