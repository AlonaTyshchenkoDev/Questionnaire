import { ActionReducer } from '@ngrx/store';

export function addToLocalStorage(reducer: ActionReducer<any>): ActionReducer<any> {
  return function(state, action) {
    const actionStore = JSON.stringify(action);
    localStorage.setItem('__state__', actionStore);
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}
