import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../../../service/auth/auth.service";
import {SignUpDTO} from "../../../../core/model/SignUpDTO";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  status = "";
  form = this.formBuilder.group({
    name: ['',
      [Validators.required,
        Validators.minLength(2)]],
    userName: ['',
      [Validators.required,
        Validators.minLength(2)]],
    email: ['',
      [Validators.required,
        Validators.minLength(2),
        Validators.email,
        Validators.pattern('^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$')]],
    password: ['',
      [Validators.required,
        Validators.minLength(6),
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[*.!@$%^&(){}]).{5,32}$')]],
  })

  constructor(private formBuilder: FormBuilder,
              private authToken: AuthService,
              private router: Router) {
  }

  registerUser() {
    console.log(this.form)
    let signUpDTO = new SignUpDTO(
      this.form.value.name,
      this.form.value.userName,
      this.form.value.email,
      this.form.value.password,
    )
    this.authToken.registerUser(signUpDTO).subscribe(data => {
      if (data.status == 202) {
        this.status = "Register failed";
      } else {
        this.status = "Register success";
        this.router.navigate(['/login']).then();
      }
    })
  }
}
