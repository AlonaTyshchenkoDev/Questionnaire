import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';

import { StoreService } from '../../../services/store.service';
import { IQuestionItem } from '../../../shared/question-item/question-item.interfaces';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit, OnDestroy {

  public list$: Observable<IQuestionItem[]> = this.storeService.getQuestionsList();
  public unansweredList: IQuestionItem[];
  public answeredList: IQuestionItem[];
  public destroy$: Subject<void> = new Subject<void>();

  constructor(private storeService: StoreService) { }

  ngOnInit(): void {
    this.getQuestionsList();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getQuestionsList(): void{
    this.list$
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (questionItem) => {
          const newDate = new Date();
          const sortList = questionItem.sort((a, b) =>
            new Date(b?.createAt || newDate).getTime() - new Date(a?.createAt || newDate).getTime());
          this.unansweredList = sortList.filter(item => !item.data.answer.length);
          this.answeredList = sortList.filter(item => item.data.answer.length);
        }})
  }
}
