import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Const} from "../constant/Const";
import {TokenService} from "../../service/token/token.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token = this.tokenService.getToken();
    let authRequest = request;
    if (token != null) {
      authRequest = request.clone({headers: request.headers.set(Const.TOKEN_HEADER, 'Bearer ' + token)})
    }
    console.log("authRequest", authRequest)
    return next.handle(authRequest);
  }
}
