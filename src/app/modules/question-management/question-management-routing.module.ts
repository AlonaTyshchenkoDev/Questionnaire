import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { QuestionManagementComponent } from './component/question-management.component';

const routes: Routes = [
  {
    path: '',
    component: QuestionManagementComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionManagementRoutingModule {
}
