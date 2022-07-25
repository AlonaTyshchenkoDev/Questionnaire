import { Component } from '@angular/core';

import { EQuestionActionType } from '../../modules/question-action/question-action.enums';
import { EQuestionsListType } from '../question-item/question-item.enums';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public readonly navList = [
    { link: '/question-list', name: 'Lists of Questions', queryParams: {type: EQuestionsListType.List} },
    { link: '/question-management', name: 'Question Management', queryParams: {type: EQuestionsListType.Management} },
    { link: '/question-action', name: 'Create question', queryParams: { type: EQuestionActionType.Create } }
  ];
}
