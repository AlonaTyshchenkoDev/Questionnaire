import { LoginPageComponent } from './login-page.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreService } from '../../../services/store.service';
import { FormBuilder } from '@angular/forms';
import { provideMockStore } from '@ngrx/store/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

class StoreServiceStub{
  logInStore(user:{email: string, password: string}) {
  }
}

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginPageComponent ],
      providers: [FormBuilder, provideMockStore()],
      schemas: [ NO_ERRORS_SCHEMA ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should create form with two controls', () => {
    expect(component.loginForm.contains('email')).toBeTruthy();
    expect(component.loginForm.contains('password')).toBeTruthy();
  })

  it('should mark password as invalid if length < minLength', () => {
    const control = component.loginForm.controls['password'];
    control.setValue('12345');

    expect(control.valid).toBeFalsy()
  })

  it('should mark email as invalid ', () => {
    const control = component.loginForm.controls['email'];
    control.setValue('test');

    expect(control.valid).toBeFalsy()
  })

  it('should submit form value to store and ro backend api', () => {
    const btn = fixture.debugElement.query(By.css('button'));
    const email = component.loginForm.controls['email'];
    const password = component.loginForm.controls['password'];

    btn.triggerEventHandler('click', {email: email, password: password});
    console.log(btn)
  })
});


