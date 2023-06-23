import {Component, OnInit} from '@angular/core';
import {mainJs} from "../../../../assets/js/Javascrip";
import {AuthService} from "../../../service/auth/auth.service";
import {Router} from "@angular/router";
import {TokenService} from "../../../service/token/token.service";

let loginAvatar: any = "";
let userName: any = "";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public loginAvatar: any = "";
  public userName: any = "";

  logout() {
    this.authService.logoutUser();
    this.router.navigate(['/login']).then();
  }

  constructor(private authService: AuthService,
              private tokenService: TokenService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loginAvatar = this.tokenService.getAvatar();
    this.userName = this.tokenService.getName();
    mainJs();
  }
}
