import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './modules/login-page/auth.quard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'question-list'
  },
  {
    path: 'question-list',
    canActivate: [AuthGuard],
    loadChildren: () => import('src/app/modules/question-list/question-list.module').then(m => m.QuestionListModule)
  },
  {
    path: 'question-action',
    canActivate: [AuthGuard],
    loadChildren: () => import('src/app/modules/question-action/question-action.module').then(m => m.QuestionActionModule)
  },
  {
    canActivate: [AuthGuard],
    path: 'question-management',
    loadChildren: () => import('src/app/modules/question-management/question-management.module').then(m => m.QuestionManagementModule)
  },
  {
    path: 'login',
    loadChildren: () => import('src/app/modules/login-page/login.module').then(m => m.LoginModule)
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
