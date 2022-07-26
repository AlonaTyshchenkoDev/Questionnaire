import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { StoreService } from '../../../services/store.service';
import { IQuestionItem } from '../../../shared/question-item/question-item.interfaces';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {

  public list$: Observable<IQuestionItem[]> = this.storeService.getQuestionsList();
  public unansweredList: IQuestionItem[];
  public answeredList: IQuestionItem[];

  constructor(
    private storeService: StoreService
  ) { }

  ngOnInit(): void {
    this.getQuestionsList();
  }


  getQuestionsList(): void{
    this.list$
      .subscribe({
        next: (res) => {
          const sortList = res.sort((a, b) =>
            new Date(b?.createAt || new Date()).getTime() - new Date(a?.createAt || new Date()).getTime());
          this.unansweredList = sortList.filter(item => !item.data.answer.length)
          this.answeredList = sortList.filter(item => item.data.answer.length)
        }})
  }
}
