import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../../../../../core/model/basic/User";
import {MatDialog} from "@angular/material/dialog";
import {PostService} from "../../../../../service/post/post.service";
import {TokenService} from "../../../../../service/token/token.service";
import {CommentDialogComponent} from "../comment-dialog/comment-dialog.component";

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss']
})
export class CommentFormComponent implements OnInit {
  @Output() reRenderParent = new EventEmitter<any>();
  @Input() postId?: any;
  @Input() loginAvatar: any = "";
  @Input() userName: any = "";
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
    dialogRef.componentInstance.reRenderParent.subscribe(data => {
      this.reRenderParent.emit(data);
    })
    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit(): void {
  }
}
