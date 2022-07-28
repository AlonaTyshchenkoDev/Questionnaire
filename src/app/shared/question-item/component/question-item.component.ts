import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { IQuestionItem } from '../question-item.interfaces';
import { StoreService } from '../../../services/store.service';
import { ModalComponent } from '../modal/modal.component';
import { EQuestionActionType } from '../../../modules/question-action/question-action.enums';
import { EQuestionType } from '../question-item.enums';

@Component({
  selector: 'app-question-item',
  templateUrl: './question-item.component.html',
  styleUrls: ['./question-item.component.scss']
})
export class QuestionItemComponent implements OnInit {

  @Input() itemData: IQuestionItem;
  @Input() isManagement: boolean = false;
  @Input() isAnswered: boolean = false;

  public readonly EQuestionType = EQuestionType;
  public answerForm: FormGroup;
  public isActive: boolean = true;
  public singleOption: string;
  public multipleOptions?: { name: string, isChecked: boolean }[];

  constructor(
    private storeService: StoreService,
    private router: Router,
    public dialog: MatDialog,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.answerForm = this.fb.group({
      open: ['']
    });
    this.multipleOptions = this.itemData.data?.options?.map(option =>
      ({name: option, isChecked: false})
    );
  }

  openModal(id: string): void {
    this.dialog.open(ModalComponent, {
      width: '400px',
      data: {id}
    });
  }

  editQuestion(id: string): void {
    this.router.navigate([`/question-action`], {queryParams: {type: EQuestionActionType.Update, id}});
  }

  getAnswerList(): string[] {
    let answerList: string[] = [];
    if (this.itemData.type === EQuestionType.Open) {
      answerList.push(this.answerForm.get('open')?.value);
    }
    if (this.itemData.type === 'multiple') {
      answerList = this.multipleOptions?.filter(option => option.isChecked).map(item => item.name) as string[];
    }
    if (this.itemData.type === EQuestionType.Single) {
      answerList.push(this.singleOption);
    }
    return answerList;
  }

  addAnswer(id: string): void {
    this.isActive = true;
    this.storeService.changeAnswers(id, this.getAnswerList());
  }

  deleteAnswer(id: string): void {
    this.storeService.changeAnswers(id,[]);
  }

  selectOption(idx: number): void {
    if (!this.multipleOptions?.length) return;
    this.multipleOptions[idx].isChecked = !this.multipleOptions[idx].isChecked;
  }
}

