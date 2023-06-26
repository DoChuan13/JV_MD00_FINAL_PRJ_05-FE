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

  public findByUserAccByName(name: any): Observable<any> {
    return this.service.getDatabaseParams(Api.USER + "/find", "", {name: name});
  }

  public getAllUserList(): Observable<any> {
    return this.service.getDatabase(Api.USER + "/list");
  }

  public changeRoleAcc(id: any, newRole: any): Observable<any> {
    return this.service.putDatabase(Api.USER + "/edit/role", id, newRole);
  }

  public blockUserAcc(id: any): Observable<any> {
    return this.service.putDatabase(Api.USER + "/edit/block", id, {});
  }

  public deleteUserAcc(id: any): Observable<any> {
    return this.service.deleteDatabase(Api.USER + "/delete", id);
  }
}
