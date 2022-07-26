import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { QuestionActionComponent } from './component/question-action.component';

const routes: Routes = [
  {
    path: '',
    component: QuestionActionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionActionRoutingModule {
}
