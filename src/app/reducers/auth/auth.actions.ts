import { Action } from '@ngrx/store';
import { IUser } from '../../modules/login-page/login-page.interfaces';

export enum authActionsType {
  logIn = '[AUTH] logIn',
  logInFail = '[AUTH] logInFail',
  signUp = '[AUTH] signUp',
  signUpFail = '[AUTH] logInFail',
  logout = '[AUTH] logout',
}

export class LogInAction implements Action {
  readonly type = authActionsType.logIn;
  constructor(public payload: { email: string, password: string }) { }
}

export class LogInFailAction implements Action {
  readonly type = authActionsType.logInFail;
  constructor(public payload: {error: string}) { }
}
export class SignUpAction implements Action {
  readonly type = authActionsType.signUp;
  constructor(public payload: IUser) { }
}

export class SignUpFailAction implements Action {
  readonly type = authActionsType.signUpFail;
  constructor(public payload: {error: string}) { }
}

export class LogOutAction implements Action {
  readonly type = authActionsType.logout;
}

export type AuthActions = LogInAction | LogInFailAction | SignUpAction | SignUpFailAction | LogOutAction;
