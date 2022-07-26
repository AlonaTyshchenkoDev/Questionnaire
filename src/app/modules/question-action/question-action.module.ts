import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { QuestionActionComponent } from './component/question-action.component';
import { QuestionActionRoutingModule } from './question-action-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    QuestionActionComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    QuestionActionRoutingModule,
  ]
})
export class QuestionActionModule { }
