import { Action } from '@ngrx/store';

import { IQuestionItem } from '../../shared/question-item/question-item.interfaces';

export enum questionsActionsType {
  addQuestionAction = '[Questions] addQuestionAction',
  updateQuestionAction = '[Questions] updateQuestionAction',
  deleteQuestionAction = '[Questions] deleteQuestionAction',
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

export class DeleteQuestionAction implements Action {
  readonly type = questionsActionsType.deleteQuestionAction;

  constructor(public payload: { id: string }) {
  }
}

export type QuestionsActions = AddQuestionAction | UpdateQuestionAction | DeleteQuestionAction;
