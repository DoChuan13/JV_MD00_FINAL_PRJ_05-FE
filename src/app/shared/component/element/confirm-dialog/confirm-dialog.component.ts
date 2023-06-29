import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {CommentService} from "../../../../service/comment/comment.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Const} from "../../../../core/constant/Const";
import {CommonService} from "../../../../service/common/common.service";
import {PostService} from "../../../../service/post/post.service";
import {ChatService} from "../../../../service/chat/chat.service";

@Component({
  selector: 'app-comment-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {
  @Output() reRenderParent = new EventEmitter<any>();
  public form = this.formBuilder.group({
    comment: ['', [Validators.required]]
  })
  protected readonly status = [
    {status: 'PUBLIC', viewValue: 'Public'},
    {status: 'FRIEND', viewValue: 'Friend'},
    {status: 'PRIVATE', viewValue: 'Private'},];

  constructor(private formBuilder: FormBuilder,
              private commentService: CommentService,
              private postService: PostService,
              private commonService: CommonService,
              private chatService: ChatService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    // console.log(this.data.comment)
  }

  confirmAction() {
    if (this.data.post) {
      this.postService.deleteCurrentPost(this.data.post.id).subscribe(data => {
        this.reRenderParent.emit({refresh: true});
        this.commonService.detectChange = Const.DELETE_POST;
        /*window.location.reload()*/
      })
    }
    if (this.data.comment) {
      this.commentService.deleteCurrentComment(this.data.comment.id).subscribe(data => {
        this.reRenderParent.emit({refresh: true});
        this.commonService.detectChange = Const.DELETE_POST;
        /*window.location.reload()*/
      })
    }
    if (this.data.chat) {
      this.chatService.leaveCurrentChat(this.data.chat.id).subscribe(data => {
        this.reRenderParent.emit({refresh: true});
        this.commonService.detectChange = Const.DELETE_CHAT;
        /*window.location.reload()*/
      })
    }
  }
}
