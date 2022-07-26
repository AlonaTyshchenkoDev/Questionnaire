import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { getQuestionById, getQuestionsList, IState } from '../reducers';
import { IQuestionItem } from '../shared/question-item/question-item.interfaces';
import { AddQuestionAction, DeleteQuestionAction, UpdateQuestionAction } from '../reducers/questions/questions.actions';

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
    return this.store.pipe(select(getQuestionById, { id }));
  }

  addQuestion(questionData: IQuestionItem): void {
    return this.store.dispatch(new AddQuestionAction({ questionData }));
  }

  updateQuestion(questionData: IQuestionItem): void {
    return this.store.dispatch(new UpdateQuestionAction({ questionData }));
  }

  deleteQuestion(id: string): void {
    return this.store.dispatch(new DeleteQuestionAction({ id }));
  }

  generateUniqueId(): string {
    return Math.random().toString(16).slice(2);
  }
}
