import {User} from "./User";

export class Friend {
  public id: number;
  public sentUser: User;
  public respUser: User;
  public status: any;

  constructor(id: number, sentUser: User, respUser: User, status: any) {
    this.id = id;
    this.sentUser = sentUser;
    this.respUser = respUser;
    this.status = status;
  }
}
