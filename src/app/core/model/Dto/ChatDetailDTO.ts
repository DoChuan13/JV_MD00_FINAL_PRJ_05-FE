import {Chat} from "../basic/Chat";

export class ChatDetailDTO {
  public chatResponse: any;
  public chat?: Chat;
  public content?: any;

  constructor(chatResponse: any, chat: Chat, content: any) {
    this.chatResponse = chatResponse;
    this.chat = chat;
    this.content = content;
  }
}
