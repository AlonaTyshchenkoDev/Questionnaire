import { IUserState } from './auth.reducer';

export const selectStatusAuth = (state: IUserState): boolean => state.authentication;
