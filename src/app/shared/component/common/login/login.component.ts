import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../../../service/auth/auth.service";
import {SignInDTO} from "../../../../core/model/SignInDTO";
import {TokenService} from "../../../../service/token/token.service";
import {Const} from "../../../../core/constant/Const";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  status = "";
  public form = this.formBuilder.group({
    userName: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private tokenService: TokenService,
              private router: Router) {
  }

  loginSubmit() {
    let signIn = new SignInDTO(
      this.form.value.userName,
      this.form.value.password);
    this.authService.loginUser(signIn).subscribe(data => {
      if (data.status == 202) {
        this.status = "Login failed. Please try again!!!"
      }
      else if (data.message=='Account has been blocked. You cannot access any resources!!!'){
        this.status = "Account has been blocked!!!"
      }
      else {
        this.tokenService.setToken(data.token)
        this.tokenService.setName(data.name)
        this.tokenService.setAvatar(data.avatar)
        this.tokenService.setRoles(data.roles)
        this.status = "Login success!!!"
        if (data.roles[0].authority == Const.USER) {
          this.router.navigate(['/']).then();
        } else {
          this.router.navigate(['/admin']).then();
        }
      }
    });
  }
}
