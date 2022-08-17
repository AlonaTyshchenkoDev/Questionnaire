import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';

import { getQuestionById, getQuestionsList, getQuestionState, IState } from '../reducers';
import { IQuestionItem } from '../shared/question-item/question-item.interfaces';
import {
  AddQuestionAction, ChangeAnswersAction,
  DeleteQuestionAction,
  SetInitialDataAction,
  UpdateQuestionAction
} from '../reducers/questions/questions.actions';
import { IQuestionState } from '../reducers/questions/questions.reducer';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private store: Store<IState>) {
  }

  getQuestionsList(): Observable<IQuestionItem[]> {
    return this.store.pipe(select(getQuestionsList));
  }

  getQuestionById(id: string): Observable<IQuestionItem> {
    return this.store.pipe(select(getQuestionById, { id }),take(1));
  }

  addQuestion(questionData: IQuestionItem): void {
    this.store.dispatch(new AddQuestionAction({ questionData }));
  }

  changeAnswers(id: string, answer: string[]): void {
    this.store.dispatch(new ChangeAnswersAction({id, answer}));
  }

  updateQuestion(questionData: IQuestionItem): void {
    this.store.dispatch(new UpdateQuestionAction({ questionData }));
  }

  deleteQuestion(id: string): void {
    this.store.dispatch(new DeleteQuestionAction({ id }));
  }

  setInitialData(): void {
    const payload = JSON.parse(localStorage.getItem('question_state') || '{}');
    if(!Object.keys(payload).length) return;
    this.store.dispatch(new SetInitialDataAction(payload));
  }

  getCurrentState(): Observable<IQuestionState> {
    return this.store.pipe(select(getQuestionState));
  }

  generateUniqueId(): string {
    return Math.random().toString(16).slice(2);
  }
}
