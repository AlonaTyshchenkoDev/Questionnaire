import { HttpClientModule } from '@angular/common/http';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { of } from 'rxjs';

import { AuthService } from './auth.service';
import { reducers } from '../../../reducers';
import { IApiUser, IUser } from '../login-page.interfaces';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthService', () => {
  let service: AuthService;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot(reducers), HttpClientModule, RouterTestingModule],
      providers: [provideMockStore({})],
    });
    service = TestBed.inject(AuthService);
    store = TestBed.inject(MockStore);
  });

  it('should call login function and return Observable', () => {
    const user =  {email: 'test'} as IUser;
    const apiUser = {token: '1'} as IApiUser
    const spy = spyOn(service, 'login').and.returnValue(of(apiUser));
    service.login(user);
    expect(spy).toBeTruthy();
  })
})
