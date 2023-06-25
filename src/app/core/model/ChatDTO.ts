import {User} from "./basic/User";

export class ChatDTO {
  public id?: number;
  public sentUser?: User;
  public respUser?: User;

  constructor(respUser: User) {
    this.respUser = respUser;
  }
}
