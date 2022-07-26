import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionManagementComponent } from './component/question-management.component';
import { QuestionManagementRoutingModule } from './question-management-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    declarations: [
        QuestionManagementComponent,
    ],
    imports: [
        CommonModule,
        QuestionManagementRoutingModule,
        SharedModule
    ]
})
export class QuestionManagementModule { }
