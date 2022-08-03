import { ActionReducerMap, createSelector, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';

import { questionReducer, questionsFeatureKey, IQuestionState } from './questions/questions.reducer';
import * as questionsSelectors from './questions/questions.selectors';
import { authKey, authReducer} from './auth/auth.reducer';
import { selectStatusAuth } from './auth/auth.selectors';

export interface IState {
  [questionsFeatureKey]: IQuestionState;
  [authKey]: any;
}

export const reducers: ActionReducerMap<IState, any> = {
  [questionsFeatureKey]: questionReducer,
  [authKey]: authReducer
};

export const getQuestionsState = (state: IState): IQuestionState => state[questionsFeatureKey];
export const getAuthState = (state: IState) => state[authKey];

export const getStatusAuth = createSelector(getAuthState, selectStatusAuth);
export const getQuestionsList = createSelector(getQuestionsState, questionsSelectors.selectQuestionsList);
export const getQuestionById = createSelector(getQuestionsState, questionsSelectors.selectQuestionById);
export const getQuestionState = createSelector(getQuestionsState, questionsSelectors.selectQuestionState);

export const metaReducers: MetaReducer<IState>[] = !environment.production ? [] : [];
