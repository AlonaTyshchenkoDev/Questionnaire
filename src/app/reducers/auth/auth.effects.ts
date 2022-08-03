import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs';
import { Router } from '@angular/router';

import { authActionsType, LogInAction } from './auth.actions';
import { AuthService } from '../../modules/login-page/services/auth.service';

@Injectable()
export class AuthEffects {

  constructor(
    private action$: Actions,
    private auth: AuthService,
    private router: Router
  ){}

  logIn = createEffect( () => this.action$.pipe(
    ofType(authActionsType.logIn),
    map((logInAction: LogInAction) =>{
        this.auth.login({email: logInAction.payload.email, password: logInAction.payload.password})
          .subscribe({
            next: () => {
              localStorage.setItem('user', logInAction.payload.email);
              this.router.navigate(['/question-management']);
            }
          })
      }
    )
  ), {dispatch: false})
}
