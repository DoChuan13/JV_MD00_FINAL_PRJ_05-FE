import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {CommentDTO} from "../../../../../core/model/Dto/CommentDTO";
import {CommentService} from "../../../../../service/comment/comment.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Const} from "../../../../../core/constant/Const";
import {CommonService} from "../../../../../service/common/common.service";

@Component({
  selector: 'app-comment-dialog',
  templateUrl: './edit-comment-dialog.component.html',
  styleUrls: ['./edit-comment-dialog.component.scss']
})
export class EditCommentDialogComponent implements OnInit {
  @Output() reRenderParent = new EventEmitter<any>();
  public form = this.formBuilder.group({
    comment: ['', [Validators.required]]
  })
  protected readonly status = [
    {status: 'PUBLIC', viewValue: 'Public'},
    {status: 'FRIEND', viewValue: 'Friend'},
    {status: 'PRIVATE', viewValue: 'Private'},];
  private commentDTO?: CommentDTO;

  constructor(private formBuilder: FormBuilder,
              private commentService: CommentService,
              private commonService: CommonService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    console.log(this.data)
    // @ts-ignore
    this.form = this.formBuilder.group({
      comment: this.data.value.comment
    });
  }

  editCurrentComment() {
    this.commentDTO = new CommentDTO(
      this.form.value.comment,
      {id: this.data.id}
    );
    this.commentService.editCurrentComment(this.commentDTO, this.data.value.id).subscribe(data => {
      console.log(data)
      this.reRenderParent.emit({refresh: true});
      this.commonService.detectChange = Const.UPDATE_COMMENT;
      /*window.location.reload()*/
    })
  }
}
