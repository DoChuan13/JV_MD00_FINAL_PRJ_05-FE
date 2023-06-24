import {User} from "./User";

export class Comment {
  public user: User;
  public comment: string;
  public commentTime:any;

  constructor(user: User, comment: string) {
    this.user = user;
    this.comment = comment;
  }
}
