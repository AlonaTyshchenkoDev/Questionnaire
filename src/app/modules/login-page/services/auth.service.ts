import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { IApiUser, IUser } from '../login-page.interfaces';
import { StoreService } from '../../../services/store.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public loginUrl: string = 'http://localhost:8999/api/login';

  constructor(
    private http: HttpClient,
    private router: Router,
    private storeService: StoreService) { }

  login(user: IUser): Observable<IApiUser>{
    return this.http.post<IApiUser>(this.loginUrl, user)
  }

  logout(): void {
    this.storeService.logOutStore();
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
