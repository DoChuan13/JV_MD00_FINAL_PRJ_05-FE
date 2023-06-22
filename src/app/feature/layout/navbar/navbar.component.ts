import {Component, OnInit} from '@angular/core';
import {mainJs} from "../../../../assets/js/Javascrip";
import {AuthService} from "../../../service/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {


  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit()
    :
    void {
    mainJs();
  }

  logout() {
    this.authService.logoutUser();
    this.router.navigate(['/login']).then();
  }
}
