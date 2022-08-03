import { TestBed } from '@angular/core/testing';
import { StoreService } from './store.service';
import { getMockStore, MockStore, provideMockStore } from '@ngrx/store/testing';
import { IState, reducers } from '../reducers';
import { State, StoreModule } from '@ngrx/store';

describe('StoreService', () => {
  let service: StoreService;
  let store: MockStore;

  const initialState = {
    questions: [],
    auth: {email: '', password: '', login: '', authentication: false}
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot(reducers)],
      providers: [provideMockStore({initialState})]
    });
    service = TestBed.inject(StoreService);
    store = TestBed.inject(MockStore)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create state', () => {
    store.setState({    questions: [{test:'test'}],
      auth: {email: '', password: '', login: '', authentication: false}
    })

    expect(store).toBeDefined()
    console.log(store)
  })
});
