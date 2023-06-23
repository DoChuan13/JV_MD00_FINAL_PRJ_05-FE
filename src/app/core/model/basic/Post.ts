import {User} from "./User";
import {Comment} from "./Comment";
import {Image} from "./Image";
import {Like} from "./Like";


export class Post {
  public id?: number;
  public content: string;
  public status: string;
  public user: User;
  public postTime: any;
  public images: Image[];
  public likes: Like[] = [];
  public comments: Comment[] = [];

  constructor(id: number, content: string, status: string, user: User, postTime: any, images: Image[], likes: Like[], comments: Comment[]) {
    this.id = id;
    this.content = content;
    this.status = status;
    this.user = user;
    this.postTime = postTime;
    this.images = images;
    this.likes = likes;
    this.comments = comments;
  }
}
