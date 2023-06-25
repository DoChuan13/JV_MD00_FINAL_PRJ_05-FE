import {Injectable} from '@angular/core';
import {HttpService} from "../http/http.service";
import {Observable} from "rxjs";
import {Api} from "../../core/constant/Api";
import {FriendRequestDTO} from "../../core/model/Dto/FriendRequestDTO";

@Injectable({
  providedIn: 'root'
})
export class FriendService {

  constructor(private service: HttpService) {
  }

  public getFriendList(): Observable<any> {
    return this.service.getDatabase(Api.FRIEND + "/list")
  }

  public getSentPendingFriend(): Observable<any> {
    return this.service.getDatabase(Api.FRIEND + "/pending")
  }

  public getConfirmPendingFriend(): Observable<any> {
    return this.service.getDatabase(Api.FRIEND + "/request")
  }

  public sendFriendRequest(friendRequestDTO: FriendRequestDTO): Observable<any> {
    return this.service.postDatabase(Api.FRIEND + "/new", friendRequestDTO);
  }

  public confirmFriendRequest(id: any, action: any): Observable<any> {
    return this.service.putDatabase(Api.FRIEND + "/confirm", id, action);
  }

  public deleteFriend(id: any): Observable<any> {
    return this.service.deleteDatabase(Api.FRIEND + "/delete", id);
  }
}
