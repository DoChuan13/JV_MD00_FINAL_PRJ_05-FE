import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {CommentDTO} from "../../../../core/model/CommentDTO";
import {CommentService} from "../../../../service/comment/comment.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-comment-dialog',
  templateUrl: './comment-dialog.component.html',
  styleUrls: ['./comment-dialog.component.scss']
})
export class CommentDialogComponent implements OnInit {
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
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    console.log(this.data)
  }

  createNewComment(id: any) {
    this.commentDTO = new CommentDTO(
      this.form.value.comment,
      {id: this.data.id}
    );
    this.commentService.createNewComment(this.commentDTO).subscribe(data => {
      console.log(data)
      window.location.reload()
    })
  }
}
