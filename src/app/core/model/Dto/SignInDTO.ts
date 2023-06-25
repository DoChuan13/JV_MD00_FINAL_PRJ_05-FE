export class SignInDTO {
  private userName: string;
  private password: string;

  constructor(userName: any, password: any) {
    this.userName = userName;
    this.password = password;
  }
}
