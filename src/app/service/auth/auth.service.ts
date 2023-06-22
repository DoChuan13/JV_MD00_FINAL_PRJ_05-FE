import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {HttpService} from "../http/http.service";
import {Observable} from "rxjs";
import {Api} from "../../core/constant/Api";
import {SignUpDTO} from "../../core/model/SignUpDTO";
import {SignInDTO} from "../../core/model/SignInDTO";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router, private service: HttpService) {
  }

  public registerUser(user: SignUpDTO): Observable<any> {
    console.log("Register User!!!");
    return this.service.postDatabase(Api.SIGN_UP, user);
  }

  public loginUser(user: SignInDTO): Observable<any> {
    console.log("Log In User!!!");
    return this.service.postDatabase(Api.SIGN_IN, user);
  }

  public logoutUser(): void {
    console.log("Logg Out!!!");
    localStorage.clear();
    this.router.navigate(["/"]).then(() => {
      window.location.reload()
    });
  }
}
