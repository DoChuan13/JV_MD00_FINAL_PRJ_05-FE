import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {PostDTO} from "../../../../../core/model/Dto/PostDTO";
import {PostService} from "../../../../../service/post/post.service";
import {Image} from "../../../../../core/model/basic/Image";
import {CommonService} from "../../../../../service/common/common.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Const} from "../../../../../core/constant/Const";

@Component({
  selector: 'app-post-dialog',
  templateUrl: './edit-post-dialog.component.html',
  styleUrls: ['./edit-post-dialog.component.scss']
})
export class EditPostDialogComponent implements OnInit {
  @Output() reRenderParent = new EventEmitter<any>();
  public form = this.formBuilder.group({
    status: ['', [Validators.required]],
    content: ['', [Validators.required]]
  })
  public imagesList: any[] = [];
  defaultImage = true;
  protected readonly status = [
    {status: 'PUBLIC', viewValue: 'Public'},
    {status: 'FRIEND', viewValue: 'Friend'},
    {status: 'PRIVATE', viewValue: 'Private'},];
  private currentId?: number;
  private postDTO?: PostDTO;

  constructor(private formBuilder: FormBuilder,
              private postService: PostService,
              private commonService: CommonService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  editCurrentPost() {
    this.postDTO = new PostDTO(
      this.form.value.content,
      this.form.value.status,
      this.imagesList
    );
    this.postService.updateCurrentPost(this.postDTO, this.data.value.id).subscribe(data => {
      console.log(data)
      this.reRenderParent.emit({refresh: true});
      this.commonService.detectChange = Const.UPDATE_POST;
      // window.location.reload()
    })
  }

  onUpload($event: string) {
    console.log("Upload Image", $event)
    this.imagesList.push(new Image($event))
    this.defaultImage = false;
  }

  ngOnInit(): void {
    console.log(this.data)
    // @ts-ignore
    this.form = this.formBuilder.group({
      status: this.data.value.status,
      content: this.data.value.content
    });
    this.imagesList = this.data.value.images;
  }
}
