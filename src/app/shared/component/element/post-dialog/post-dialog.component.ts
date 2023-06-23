import {Component, Inject} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {PostDTO} from "../../../../core/model/PostDTO";
import {PostService} from "../../../../service/post/post.service";
import {Image} from "../../../../core/model/basic/Image";
import {Router} from "@angular/router";
import {HomeComponent} from "../../user/home/home.component";

@Component({
  selector: 'app-post-dialog',
  templateUrl: './post-dialog.component.html',
  styleUrls: ['./post-dialog.component.scss']
})
export class PostDialogComponent {
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
              private router: Router) {
  }

  createNewPost() {
    this.postDTO = new PostDTO(
      this.form.value.content,
      this.form.value.status,
      this.imagesList
    );
    this.postService.createNewPost(this.postDTO).subscribe(data=>{
      console.log(data)
      window.location.reload()
    })
  }

  onUpload($event: string) {
    console.log("Upload Image", $event)
    this.imagesList.push(new Image($event))
  }
}
