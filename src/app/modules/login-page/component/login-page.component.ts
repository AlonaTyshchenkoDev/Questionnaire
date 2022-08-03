import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { StoreService } from '../../../services/store.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  public hide: boolean = true;
  public message: string;
  public loginForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(
    private formBuilder: FormBuilder,
    private storeService: StoreService
  ) {
  }

  submitForm(): void {
    if(this.loginForm.invalid) return;
    const user = this.loginForm.value;
    this.storeService.logInStore(user);
  }
}
