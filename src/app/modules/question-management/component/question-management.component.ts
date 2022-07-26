import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { IQuestionItem } from '../../../shared/question-item/question-item.interfaces';
import { StoreService } from '../../../services/store.service';

@Component({
  selector: 'app-question-management',
  templateUrl: './question-management.component.html',
  styleUrls: ['./question-management.component.scss']
})
export class QuestionManagementComponent {

  public itemList$: Observable<IQuestionItem[]> = this.storeService.getQuestionsList();

  constructor(private storeService: StoreService) { }
}
