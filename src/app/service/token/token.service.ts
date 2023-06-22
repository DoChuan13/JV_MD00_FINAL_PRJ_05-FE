import {Injectable} from '@angular/core';
import {Const} from "../../core/constant/Const";

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private roles?: string [] = [];

  constructor() {
  }

  getName(): string | null {
    return localStorage.getItem(Const.NAME_KEY);
  }

  setName(name: string) {
    localStorage.removeItem(Const.NAME_KEY);
    localStorage.setItem(Const.NAME_KEY, name);
  }

  getAvatar(): string | null {
    return localStorage.getItem(Const.AVATAR_KEY);
  }

  setAvatar(avatar: string) {
    localStorage.removeItem(Const.AVATAR_KEY);
    localStorage.setItem(Const.AVATAR_KEY, avatar);
  }

  getToken(): string | null {
    return localStorage.getItem(Const.TOKEN_KEY);
  }

  setToken(token: string) {
    localStorage.removeItem(Const.AVATAR_KEY);
    localStorage.setItem(Const.TOKEN_KEY, token);
  }

  getRoles(): string[] | undefined {
    let result = localStorage.getItem(Const.ROLES_KEY);
    if (result != null) {
      JSON.parse(result).forEach((role: any) => {
        this.roles?.push(role.authority);
      })
    }
    return this.roles;
  }

  setRoles(roles: string[]) {
    localStorage.removeItem(Const.ROLES_KEY);
    localStorage.setItem(Const.ROLES_KEY, JSON.stringify(roles));
  }
}
