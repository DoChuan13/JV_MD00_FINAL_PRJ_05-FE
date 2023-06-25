import {Chat} from "../basic/Chat";

export class ChatDetailDTO {
  public chat?: Chat;
  public content?: any;

  constructor(chat: Chat, content: any) {
    this.chat = chat;
    this.content = content;
  }
}
