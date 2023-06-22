export class SignUpDTO {
  private name?: string;
  private userName?: string;
  private email?: string;
  private password?: string;
  private roles?: any;

  constructor(name: string, userName: string, email: string, password: string) {
    this.name = name;
    this.userName = userName;
    this.email = email;
    this.password = password;
    this.roles = ['user'];
  }
}
