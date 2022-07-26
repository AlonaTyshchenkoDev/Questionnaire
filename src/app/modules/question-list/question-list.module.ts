import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionListComponent } from './component/question-list.component';
import { QuestionListRoutingModule } from './question-list-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    QuestionListComponent
  ],
    imports: [
        CommonModule,
        QuestionListRoutingModule,
        SharedModule
    ]
})
export class QuestionListModule { }
