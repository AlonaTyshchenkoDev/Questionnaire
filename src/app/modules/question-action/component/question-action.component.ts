import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';

import { StoreService } from '../../../services/store.service';
import { CQuestionActionTypeOptions } from '../question-action.constantes';
import { EQuestionActionType } from '../question-action.enums';
import { NotificationService } from '../../../services/notification.service';
import { EQuestionType } from '../../../shared/question-item/question-item.enums';
import { IQuestionItem } from '../../../shared/question-item/question-item.interfaces';

@Component({
  selector: 'app-question-action',
  templateUrl: './question-action.component.html',
  styleUrls: ['./question-action.component.scss']
})
export class QuestionActionComponent implements OnInit, OnDestroy {
  public readonly EQuestionActionType = EQuestionActionType;
  public readonly EQuestionType = EQuestionType;
  public readonly typeOptions = CQuestionActionTypeOptions;

  public destroy$: Subject<void> = new Subject<void>();

  public questionForm: FormGroup;
  public pageType: string = EQuestionActionType.Create;
  public options: string[] = [];
  public questionType: string = EQuestionType.Single;
  public selectedId: string;

  constructor(
    private storeService: StoreService,
    private activatedRoute: ActivatedRoute,
    private notificationService: NotificationService,
    private fb: FormBuilder,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.checkQueryParams();
    this.initForm();
    this.initQuestionById();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  initForm(): void {
    this.questionForm = this.fb.group({
      type: [''],
      question: ['', [Validators.required]],
      option: ['']
    });
    this.questionForm.get('type')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (type) => {
          this.questionType = type?.toLowerCase();
        }
      });
  }

  checkQueryParams(): void {
    this.activatedRoute.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (params) => {
          this.pageType = params['type'];
        }
      });
  }

  addOption(): void {
    const optionValue = this.questionForm.value.option;
    if (!optionValue || !optionValue.trim().length) {
      this.notificationService.onError('Option value is empty!');
      return;
    }
    this.options.push(optionValue.trim());
    this.questionForm.get('option')?.setValue('');
  }

  deleteOption(index: number): void {
    this.options.splice(index, 1);
  }

  createQuestion(): void {
    if(this.questionForm.invalid) return;
    const questionData: IQuestionItem = {
      id: this.storeService.generateUniqueId(),
      createAt: new Date(),
      updateAt: new Date(),
      type: this.questionType,
      data: {
        question: this.questionForm.value.question,
        options: this.options,
        answer: []
      }
    };
    this.storeService.addQuestion(questionData);
    this.router.navigate(['/question-management']);
    this.notificationService.onSuccess('New question was created');
  }

  initQuestionById(){
    this.activatedRoute.queryParams
      .subscribe({
        next: (res) => this.selectedId = res?.['id']
        });
  }

  updateQuestion(): void {
    const updatedData: IQuestionItem = {
      id: this.selectedId,
      updateAt: new Date(),
      type: this.questionType,
      data: {
        question: this.questionForm.value.question,
        options: this.options,
        answer: []
      }
    }
    this.storeService.updateQuestion(updatedData);
    this.router.navigate(['/question-management']);
  }
}
