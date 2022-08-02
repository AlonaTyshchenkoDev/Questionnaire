// import { FooterComponent } from './footer.component';
// import { AuthService } from '../../modules/login-page/services/auth.service';
// import { HttpClientModule } from '@angular/common/http';
// import { Router } from '@angular/router';
// import { StoreService } from '../../services/store.service';
// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { StoreModule } from '@ngrx/store';
//
//
// class RouterStub {
//  navigate(path: string[]){
//  }
// }
//
// class AuthServiceStub {
//   logout(){}
// }
//
// describe('FooterComponent', () => {
//
//   let component: FooterComponent;
//   let fixture: ComponentFixture<FooterComponent>;
//   let service: AuthService;
//   let btn: HTMLElement;
//
//     beforeEach( () => {
//       TestBed.configureTestingModule({
//         declarations: [FooterComponent],
//         providers: [AuthService, StoreService,
//           {provide: Router, useClass: RouterStub}
//         ],
//         imports: [HttpClientModule, StoreModule]
//       })
//       fixture = TestBed.createComponent(FooterComponent);
//       component = fixture.componentInstance;
//     })
//
//   it('should create', () => {
//     expect(component).toBeDefined()
//   })
//   }
// )
