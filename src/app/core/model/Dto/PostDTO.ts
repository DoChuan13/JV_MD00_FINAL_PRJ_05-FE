export class PostDTO {
  public id?: number;
  public content: string;
  public status: string;
  public images: any[];

  constructor(content: any, status: any, images: any[]) {
    this.content = content;
    this.status = status;
    this.images = images;
  }
}
