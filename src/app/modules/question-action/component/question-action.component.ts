import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

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
  public selectedTypeId: number = 0;

  constructor(
    private storeService: StoreService,
    private activatedRoute: ActivatedRoute,
    private notificationService: NotificationService,
    private fb: FormBuilder,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.initForm();
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
          if(this.questionType !== EQuestionType.Open) return;
          this.options = [];
        }
      });
    this.checkQueryParams();
  }

  checkQueryParams(): void {
    this.activatedRoute.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (params) => {
          this.pageType = params['type'];
          this.selectedId = params['id'];
          this.getQuestionData();
        }
      });
  }

  getQuestionData(): void {
    if(!this.selectedId) return;
    this.storeService.getQuestionById(this.selectedId)
      .subscribe({
        next: (questionItem) => {
          this.questionForm.setValue({
            type: questionItem.type,
            question: questionItem.data.question,
            option: ''
          });
          this.selectedTypeId = this.typeOptions
            .findIndex(option => option.value.toLowerCase() === questionItem.type);
          if(questionItem.type === EQuestionType.Open || !questionItem.data.options?.length) return;
          this.options = [...questionItem.data.options];
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
    if(this.questionType !== EQuestionType.Open.toLowerCase() && this.options.length < 2) {
      this.notificationService.onError('There are must be two or more options');
      return;
    }
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

  updateQuestion(): void {
    if(this.questionType !== EQuestionType.Open.toLowerCase() && this.options.length < 2) {
      this.notificationService.onError('There are must be two or more options');
      return;
    }
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
