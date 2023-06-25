export class SignUpDTO {
  private id?: number;
  private name?: string;
  private userName?: string;
  private email?: string;
  private password?: string;
  private roles?: any;

  constructor(name: any, userName: any, email: any, password: any) {
    this.name = name;
    this.userName = userName;
    this.email = email;
    this.password = password;
    this.roles = ['user'];
  }
}
