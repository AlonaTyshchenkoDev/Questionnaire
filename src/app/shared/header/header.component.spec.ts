import { HeaderComponent } from './header.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { QuestionListComponent } from '../../modules/question-list/component/question-list.component';
import { QuestionManagementComponent } from '../../modules/question-management/component/question-management.component';
import { QuestionActionComponent } from '../../modules/question-action/component/question-action.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('HeaderComponent', () => {

  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>

  beforeEach( () => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [RouterTestingModule.withRoutes([
        {path: 'question-list', component: QuestionListComponent},
        {path: 'question-management', component: QuestionManagementComponent},
        {path: 'question-action', component: QuestionActionComponent},
      ])
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should be created', () => {
    expect(component).toBeDefined()
  })
})
