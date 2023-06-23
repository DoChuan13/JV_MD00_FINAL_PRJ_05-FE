import {Injectable} from '@angular/core';
import {HttpService} from "../http/http.service";
import {Observable} from "rxjs";
import {Api} from "../../core/constant/Api";
import {CommentDTO} from "../../core/model/CommentDTO";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private service: HttpService) {
  }

  public createNewComment(comment: CommentDTO): Observable<any> {
    console.log("Create New Post!!!");
    return this.service.postDatabase(Api.COMMENT, comment);
  }
}
