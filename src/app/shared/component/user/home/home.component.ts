import {Component, OnInit} from '@angular/core';
import {PostService} from "../../../../service/post/post.service";
import {Post} from "../../../../core/model/basic/Post";
import {TokenService} from "../../../../service/token/token.service";
import {LikeService} from "../../../../service/like/like.service";
import {UserService} from "../../../../service/user/user.service";
import {User} from "../../../../core/model/basic/User";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  page = {page: 0, size: 3}
  public loginAvatar: any = "";
  public userName: any = "";
  public email = "";
  public user?: User;
  public loadAble = true;
  public totalElements = 0;
  postList: Post[] = [];

  constructor(private postService: PostService,
              private tokenService: TokenService,
              private likeService: LikeService,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.firstLoadInfo();
    /*window.addEventListener('scroll', (e) => {
      const scroll = window.innerHeight + window.scrollY;
      const windows = document.body.scrollHeight;
      let scale = scroll / windows;

      if (scale >= 0.700 && scale <= 0.71) {
        console.log("Loading point");
        this.page.size += 3;
        this.postService.getPostPage(this.page).subscribe(data => {
          this.postList = data['content'];
          console.log(this.postList)
        })
      }
      return false;
    })*/
  }

  loadModePost() {
    this.page.size += 3;
    this.postService.getPostPage(this.page).subscribe(data => {
      this.postList = data['content'];
      this.totalElements += 3;
      if (this.totalElements >= data['totalElements']) {
        this.loadAble = false;
      }
    })
  }

  convertDate(date: any) {
    return new Date(date).toLocaleString('us-US', {timeZone: 'UTC'});
  }

  checkLikeStatus(post: Post) {
    const likes = post.likes;
    for (let i = 0; i < likes.length; i++) {
      if (likes[i].user.id == this.user?.id) {
        return true;
      }
    }
    return false;
  }

  likePost(id: number | undefined) {
    let like = {post: {id: id}}
    console.log(like)
    this.likeService.likePost(like).subscribe(data => {
      console.log(data);
      this.reRenderData();
    })
  }

  reRenderData() {
    this.postService.getPostPage(this.page).subscribe(data => {
      this.postList = data['content'];
    })
  }

  private firstLoadInfo() {
    this.loginAvatar = this.tokenService.getAvatar();
    this.userName = this.tokenService.getName();
    this.postService.getPostPage(this.page).subscribe(data => {
      this.postList = data['content'];
      this.totalElements += 3;
      if (this.totalElements >= data['totalElements']) {
        this.loadAble = false;
      }
    })
    this.userService.getUserInfo().subscribe(data => {
      this.user = data;
    });
  }

}

