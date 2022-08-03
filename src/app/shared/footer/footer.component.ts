import { Component } from '@angular/core';
import { AuthService } from '../../modules/login-page/services/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  public currentYear = new Date().getFullYear();

  constructor(private auth: AuthService) {
  }
  logOut(): void {
    this.auth.logout();
  }
}
