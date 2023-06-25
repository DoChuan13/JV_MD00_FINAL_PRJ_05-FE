import {Injectable} from '@angular/core';
import {User} from "../../core/model/basic/User";
import {Chat} from "../../core/model/basic/Chat";

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  detectChange?: any
  loginUser?: User;
  chatId?: any;
  catchChatDetail = false;
  chatList: Chat[] = [];
  findUserResult: User[] = [];

  constructor() {
  }
}
