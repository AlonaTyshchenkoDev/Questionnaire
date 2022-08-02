import { AuthActions, authActionsType } from 'src/app/reducers/auth/auth.actions';

export const authKey = 'auth';

export interface IUserState {
  login: string,
  email: string,
  password: string,
  authentication: boolean
}

const initialState: IUserState = {
  login: '',
  email: '',
  password: '',
  authentication: false
};

export const authReducer = (state = initialState, action: AuthActions) => {
  switch (action.type) {
    case authActionsType.logIn:
      return {
        ...state,
        email: action.payload.email,
        password: action.payload.password,
        authentication: true
      };
    case authActionsType.logInFail:
      return {
        ...state,
        error: action.payload.error
      };
    case authActionsType.signUp:
      return {
        ...state,
        login: action.payload.login,
        email: action.payload.email,
        authentication: true
      };
    case authActionsType.signUpFail:
      return {
        ...state,
        error: action.payload.error
      };
    case authActionsType.logout:
      return {
        ...state,
        email: '',
        password:'',
        authentication: false,
      };
    default:
      return state;
  }
};
