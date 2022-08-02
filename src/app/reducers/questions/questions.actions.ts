import { Action } from '@ngrx/store';

import { IQuestionItem } from '../../shared/question-item/question-item.interfaces';
import { IQuestionState } from './questions.reducer';

export enum questionsActionsType {
  addQuestionAction = '[Questions] addQuestionAction',
  updateQuestionAction = '[Questions] updateQuestionAction',
  deleteQuestionAction = '[Questions] deleteQuestionAction',
  setInitialData = '[Questions] setInitialData',
  changeAnswersAction = '[Questions] changeAnswersAction',
}

export class AddQuestionAction implements Action {
  readonly type = questionsActionsType.addQuestionAction;

  constructor(public payload: { questionData: IQuestionItem }) {
  }
}

export class UpdateQuestionAction implements Action {
  readonly type = questionsActionsType.updateQuestionAction;

  constructor(public payload: { questionData: IQuestionItem }) {
  }
}

export class ChangeAnswersAction implements Action {
  readonly type = questionsActionsType.changeAnswersAction;

  constructor(public payload: { id:string, answer: string[] }) {
  }
}

export class DeleteQuestionAction implements Action {
  readonly type = questionsActionsType.deleteQuestionAction;

  constructor(public payload: { id: string }) {
  }
}

export class SetInitialDataAction implements Action {
  readonly type = questionsActionsType.setInitialData;

  constructor(public payload: IQuestionState) {
  }
}

export type QuestionsActions = AddQuestionAction | ChangeAnswersAction |UpdateQuestionAction | DeleteQuestionAction | SetInitialDataAction;
