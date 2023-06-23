export class User {
  public id: number;
  public name: string;
  public userName: string;
  public email: string;
  public password: string;
  public roles: any;
  public avatar: string;

  constructor(id: number, name: string, userName: string, email: string, password: string, roles: any, avatar: string) {
    this.id = id;
    this.name = name;
    this.userName = userName;
    this.email = email;
    this.password = password;
    this.roles = roles;
    this.avatar = avatar;
  }
}
