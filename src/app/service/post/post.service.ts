import {Injectable} from '@angular/core';
import {HttpService} from "../http/http.service";
import {Observable} from "rxjs";
import {Api} from "../../core/constant/Api";
import {PostDTO} from "../../core/model/PostDTO";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private service: HttpService) {
  }

  public getPostPage(page: any): Observable<any> {
    console.log("Create New Post!!!");
    return this.service.getDatabaseParams(Api.POST + "/page", "", page);
  }

  public createNewPost(post: PostDTO): Observable<any> {
    console.log("Create New Post!!!");
    return this.service.postDatabase(Api.POST, post);
  }

  public updateCurrentPost(post: PostDTO, id: any): Observable<any> {
    console.log("Update Current Post!!!");
    return this.service.putDatabase(Api.POST, id, post);
  }

  public deleteCurrentPost(id: any): Observable<any> {
    console.log("Update Current Post!!!");
    return this.service.deleteDatabase(Api.POST, id);
  }
}
