export class JwtResponse {
  name?: string;
  avatar?: string;
  token?: string;
  roles?: string[];

  constructor(name: string, avatar: string, token: string, roles: string[]) {
    this.name = name;
    this.avatar = avatar;
    this.token = token;
    this.roles = roles;
  }
}
