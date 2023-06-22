import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {TokenService} from "../service/token/token.service";

export const authGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);
  let token = tokenService.getToken();
  let roles = tokenService.getRoles();

  if (token != null && roles != null) {
    router.navigate(['/forbidden']).then(() => {
      console.log("Role do not permission!!! Redirect to Forbidden")
    });
    return false;
  }
  return true;
};
