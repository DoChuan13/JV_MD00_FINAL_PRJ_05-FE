import {Injectable} from '@angular/core';
import {User} from "../../core/model/basic/User";

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  detectChange?: any
  loginUser?: User;
  chatId?: any;
  catchChatDetail = false;

  constructor() {
  }
}
