import { ActionReducer, ActionReducerMap, createSelector, MetaReducer } from '@ngrx/store';

import { environment } from '../../environments/environment';

import { questionReducer, questionsFeatureKey, IQuestionState } from './questions/questions.reducer';
import * as questionsSelectors from './questions/questions.selectors';
import { addToLocalStorage } from './meta-reducer';

export interface IState {
  [questionsFeatureKey]: IQuestionState;
}

export const reducers: ActionReducerMap<IState, any> = {
  [questionsFeatureKey]: questionReducer,
};

export const getQuestionsState = (state: IState): IQuestionState => state[questionsFeatureKey];

export const getQuestionsList = createSelector(getQuestionsState, questionsSelectors.selectQuestionsList);
export const getQuestionById = createSelector(getQuestionsState, questionsSelectors.selectQuestionById);

export const metaReducers: MetaReducer<IState>[] = [addToLocalStorage];
