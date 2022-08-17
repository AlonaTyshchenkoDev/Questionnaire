import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Store, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { delay, first } from 'rxjs';

import { reducers, metaReducers, IState, getQuestionsList } from './reducers';
import { environment } from '../environments/environment';
import { SharedModule } from './shared/shared.module';
import { StoreService } from './services/store.service';

function initializeApp(dataService: StoreService, store: Store<IState>): () => Promise<boolean> {
  return () => new Promise(async (resolve, reject) => {
    store.select(getQuestionsList)
      .pipe(
        delay(2000),
        first()
      )
      .subscribe({
        next: () => {
          resolve(true);
        }
      });
  });
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: initializeApp,
    deps: [StoreService, Store],
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
