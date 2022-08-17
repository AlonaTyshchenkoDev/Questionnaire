import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { StoreService } from './services/store.service';
import { IQuestionState } from './reducers/questions/questions.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{

  public currentState: IQuestionState;
  public destroy$: Subject<void> = new Subject<void>();

  @HostListener('window:beforeunload') onBeforeUnload() {
    localStorage.setItem('question_state', JSON.stringify(this.currentState))
  }

  constructor(
    private storeService: StoreService
  ) {
  }

  ngOnInit(): void {
    this.getCurrentState();
    this.setInitialState();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  setInitialState(){
    this.storeService.setInitialData();
  }

  getCurrentState(){
    this.storeService.getCurrentState()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (questionState) => this.currentState = questionState
      })
  }
}
