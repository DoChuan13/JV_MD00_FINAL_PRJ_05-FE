import {Injectable} from '@angular/core';
import {HttpService} from "../http/http.service";
import {Observable} from "rxjs";
import {Api} from "../../core/constant/Api";

@Injectable({
  providedIn: 'root'
})
export class LikeService {
  constructor(private service: HttpService) {
  }

  public likePost(like: any): Observable<any> {
    return this.service.postDatabase(Api.LIKE, like);
  }
}
