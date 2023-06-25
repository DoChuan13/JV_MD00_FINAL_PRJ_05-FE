import {Component, OnInit} from '@angular/core';
import {UserService} from "./service/user/user.service";
import {Router} from "@angular/router";
import {AuthService} from "./service/auth/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private userService: UserService,
              private router: Router,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.userService.getUserInfo().subscribe(data => {
      if (data.message == 'Account has been blocked. You cannot access any resources!!!') {
        console.log("Account has been blocked")
        this.authService.logoutUser();
        this.router.navigate(['/login']).then();
      }
    })
  }
}
