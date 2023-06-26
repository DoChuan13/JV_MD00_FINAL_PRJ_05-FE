import {Component} from '@angular/core';
import {AuthService} from "../../../../service/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.scss']
})
export class AdminNavbarComponent {
  constructor(private authService: AuthService,
              private router: Router) {
  }

  logout() {
    this.authService.logoutUser();
    this.router.navigate(['/login']).then();
  }
}
