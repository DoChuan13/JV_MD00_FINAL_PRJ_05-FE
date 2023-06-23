import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../../core/model/basic/User";
import {MatDialog} from "@angular/material/dialog";
import {PostService} from "../../../../service/post/post.service";
import {TokenService} from "../../../../service/token/token.service";
import {CommentDialogComponent} from "../comment-dialog/comment-dialog.component";

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss']
})
export class CommentFormComponent implements OnInit {
  @Input() postId?: any;
  public loginAvatar: any = "";
  public userName: any = "";
  public user?: User;


  constructor(public dialog: MatDialog,
              private postService: PostService,
              private tokenService: TokenService) {
  }

  openDialog() {
    const dialogRef = this.dialog.open(CommentDialogComponent, {
      data: {
        id: this.postId
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit(): void {
    this.firstLoadInfo();
  }

  private firstLoadInfo() {
    this.loginAvatar = this.tokenService.getAvatar();
    this.userName = this.tokenService.getName();
  }
}
