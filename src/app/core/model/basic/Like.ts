import {Post} from "./Post";
import {User} from "./User";

export class Like {
  public post: Post;
  public user: User

  constructor(post: Post, user: User) {
    this.post = post;
    this.user = user;
  }
}
