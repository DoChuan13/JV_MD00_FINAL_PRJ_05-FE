import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {PostDTO} from "../../../../../core/model/Dto/PostDTO";
import {PostService} from "../../../../../service/post/post.service";
import {Image} from "../../../../../core/model/basic/Image";
import {CommonService} from "../../../../../service/common/common.service";
import {Const} from "../../../../../core/constant/Const";

@Component({
  selector: 'app-post-dialog',
  templateUrl: './post-dialog.component.html',
  styleUrls: ['./post-dialog.component.scss']
})
export class PostDialogComponent {
  @Output() reRenderParent = new EventEmitter<any>();
  public form = this.formBuilder.group({
    status: ['', [Validators.required]],
    content: ['', [Validators.required]]
  })

  public imagesList: any[] = [];
  protected readonly status = [
    {status: 'PUBLIC', viewValue: 'Public'},
    {status: 'FRIEND', viewValue: 'Friend'},
    {status: 'PRIVATE', viewValue: 'Private'},];
  private postDTO?: PostDTO;

  constructor(private formBuilder: FormBuilder,
              private postService: PostService,
              private commonService: CommonService) {
  }

  createNewPost() {
    this.postDTO = new PostDTO(
      this.form.value.content,
      this.form.value.status,
      this.imagesList
    );
    this.postService.createNewPost(this.postDTO).subscribe(data=> {
      console.log(data)
      this.reRenderParent.emit({refresh: true});
      this.commonService.detectChange = Const.CREATE_POST;
      // window.location.reload()
    })
  }

  onUpload($event: string) {
    console.log("Upload Image", $event)
    this.imagesList.push(new Image($event))
  }
}
