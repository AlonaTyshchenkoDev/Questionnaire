import { Component } from '@angular/core';

import { EQuestionActionType } from '../../modules/question-action/question-action.enums';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public readonly navList = [
    { link: '/question-list', name: 'Lists of Questions'},
    { link: '/question-management', name: 'Question Management'},
    { link: '/question-action', name: 'Create question', queryParams: { type: EQuestionActionType.Create } }
  ];
}
