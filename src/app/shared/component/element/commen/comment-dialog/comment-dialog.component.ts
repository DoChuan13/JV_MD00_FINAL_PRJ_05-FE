import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {CommentDTO} from "../../../../../core/model/CommentDTO";
import {CommentService} from "../../../../../service/comment/comment.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Const} from "../../../../../core/constant/Const";
import {CommonService} from "../../../../../service/common/common.service";

@Component({
  selector: 'app-comment-dialog',
  templateUrl: './comment-dialog.component.html',
  styleUrls: ['./comment-dialog.component.scss']
})
export class CommentDialogComponent implements OnInit {
  @Output() reRenderParent = new EventEmitter<any>();
  public form = this.formBuilder.group({
    comment: ['', [Validators.required]]
  })

  public imagesList: any[] = [];
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
  }

  createNewComment() {
    this.commentDTO = new CommentDTO(
      this.form.value.comment,
      {id: this.data.id}
    );
    this.commentService.createNewComment(this.commentDTO).subscribe(data => {
      console.log(data)
      this.reRenderParent.emit({refresh: true});
      this.commonService.detectChange = Const.CREATE_COMMENT;
      /*window.location.reload()*/
    })
  }
}
