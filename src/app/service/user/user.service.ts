import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Api} from "../../core/constant/Api";
import {HttpService} from "../http/http.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private service: HttpService) {
  }

  public getUserInfo(): Observable<any> {
    return this.service.getDatabase(Api.USER);
  }
}
