import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {TokenService} from "../service/token/token.service";
import {Const} from "../core/constant/Const";
import {findAccRole} from "./admin-auth.guard";

export const userAuthGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);
  let token = tokenService.getToken();
  let roles = tokenService.getRoles();

  if (token == null) {
    router.navigate(['/login']).then(() => {
      console.log("Access Deny!!! Redirect to Login")
    });
    return false;
  } else {
    if (roles == null) {
      router.navigate(['/login']).then(() => {
        console.log("Role Unknown!!! Redirect to Login")
      });
      return false;
    } else {
      let roleName = findAccRole(roles);
      if (roleName != Const.USER) {
        router.navigate(['/login']).then(() => {
          console.log("Role do not permission!!! Redirect to Login")
        });
        return false;
      }
      return true;
    }
  }
};
