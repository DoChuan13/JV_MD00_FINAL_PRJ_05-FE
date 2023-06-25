import {Injectable} from '@angular/core';
import {HttpService} from "../http/http.service";
import {Observable} from "rxjs";
import {Api} from "../../core/constant/Api";
import {ChatDTO} from "../../core/model/ChatDTO";
import {ChatDetailDTO} from "../../core/model/ChatDetailDTO";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private service: HttpService) {
  }

  public getChatDetail(id: any): Observable<any> {
    return this.service.getDatabase(Api.CHAT, id);
  }

  public getChatList(): Observable<any> {
    return this.service.getDatabase(Api.CHAT + "/list");
  }

  public createNewChat(chatDTO: ChatDTO): Observable<any> {
    return this.service.postDatabase(Api.CHAT + "/new", chatDTO);
  }

  public leaveCurrentChat(id: any): Observable<any> {
    return this.service.putDatabase(Api.CHAT + "/leave/", id, {});
  }

  public sendChatContent(chatDetailDTO: ChatDetailDTO): Observable<any> {
    return this.service.postDatabase(Api.CHAT, chatDetailDTO);
  }
}
