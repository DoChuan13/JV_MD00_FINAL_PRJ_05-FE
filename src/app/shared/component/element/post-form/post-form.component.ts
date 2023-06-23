import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {PostDialogComponent} from "../post-dialog/post-dialog.component";
import {User} from "../../../../core/model/basic/User";
import {PostService} from "../../../../service/post/post.service";
import {TokenService} from "../../../../service/token/token.service";

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {
  public loginAvatar: any = "";
  public userName: any = "";
  public user?: User;


  constructor(public dialog: MatDialog,
              private postService: PostService,
              private tokenService: TokenService) {
  }

  openDialog() {
    const dialogRef = this.dialog.open(PostDialogComponent);
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
