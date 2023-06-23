export class CommentDTO {
  public comment: string;
  public post: any

  constructor(comment: any, post: any) {
    this.comment = comment;
    this.post = post;
  }
}
