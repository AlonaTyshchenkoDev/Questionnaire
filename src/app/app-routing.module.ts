import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'question-list'
  },
  {
    path: 'question-list',
    loadChildren: () => import('src/app/modules/question-list/question-list.module').then(m => m.QuestionListModule)
  },
  {
    path: 'question-action',
    loadChildren: () => import('src/app/modules/question-action/question-action.module').then(m => m.QuestionActionModule)
  },
  {
    path: 'question-management',
    loadChildren: () => import('src/app/modules/question-management/question-management.module').then(m => m.QuestionManagementModule)
  },
  {
    path: '**',
    redirectTo: 'question-list'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
