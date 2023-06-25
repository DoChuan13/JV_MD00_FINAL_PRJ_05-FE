import {User} from "./User";

export class Chat {
  public id?: number;
  public sentUser?: User;
  public respUser?: User;
  public creatTime?: any;
  public latestTime?: any;
  public chatDetails?: ChatDetail;

  constructor(sentUser: User, respUser: User, creatTime: any, latestTime: any) {
    this.sentUser = sentUser;
    this.respUser = respUser;
    this.creatTime = creatTime;
    this.latestTime = latestTime;
  }
}

export class ChatDetail {
  public id?: number;
  public chat?: Chat;
  public user?: User;
  public content?: any;
  public sentTime?: any;

  constructor(chat: Chat, content: any) {
    this.chat = chat;
    this.content = content;
  }
}
