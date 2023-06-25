import {Component, DoCheck, OnInit} from '@angular/core';
import {UserService} from "../../../../service/user/user.service";
import {User} from "../../../../core/model/basic/User";
import {Friend} from "../../../../core/model/basic/Friend";
import {FriendService} from "../../../../service/friend/friend.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CommonService} from "../../../../service/common/common.service";
import {FriendRequestDTO} from "../../../../core/model/Dto/FriendRequestDTO";

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.scss']
})
export class FriendComponent implements OnInit, DoCheck {
  public renderList: User[] = [];
  user?: User;
  findUser: any;
  public currentPath = "home";
  private renderSwitch = true;
  private sentPendingFriend: Friend[] = [];
  private confirmPendingFriend: Friend[] = [];
  private friendList: Friend[] = [];

  constructor(private userService: UserService,
              private commonService: CommonService,
              private friendService: FriendService,
              private activeRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.firstLoad();
  }

  ngDoCheck() {
    const url = this.router.url;
    if (url.includes("sent-request")) {
      this.currentPath = "sent-request";
    } else if (url.includes("request")) {
      this.currentPath = "request";
    } else if (url.includes("search")) {
      this.currentPath = "search";
    } else {
      this.currentPath = "home";
    }
    if (this.currentPath !== "home" && !url.includes(this.currentPath)
    ) {
      this.renderSwitch = true;
    }
    console.log(this.renderSwitch)
    if (this.renderSwitch) {
      this.renderList = [];
      if (this.currentPath == "home") {
        console.log("Render In Home")
        console.log(this.friendList)
        const friends = this.friendList;
        for (let i = 0; i < friends.length; i++) {
          if (friends[i].sentUser.id == this.user?.id) {
            this.renderList.push(friends[i].respUser);
          } else {
            this.renderList.push(friends[i].sentUser);
          }
        }
      }

      if (this.currentPath == "sent-request") {
        console.log("Render In Sent Request")
        const friends = this.sentPendingFriend;
        for (let i = 0; i < friends.length; i++) {
          if (friends[i].sentUser.id == this.user?.id) {
            this.renderList.push(friends[i].respUser);
          } else {
            this.renderList.push(friends[i].sentUser);
          }
        }
      }

      if (this.currentPath == "request") {
        console.log("Render In Request")
        const friends = this.confirmPendingFriend;
        for (let i = 0; i < friends.length; i++) {
          if (friends[i].sentUser.id == this.user?.id) {
            this.renderList.push(friends[i].respUser);
          } else {
            this.renderList.push(friends[i].sentUser);
          }
        }
      }

      if (this.currentPath == "search") {
        console.log("Render In Search")
        this.renderList = this.commonService.findUserResult;
      }
      this.renderSwitch = false;
    }
  }

  findFriend() {
    console.log(this.findUser)
    this.userService.findByUserAccByName(this.findUser).subscribe(data => {
      this.renderList = data;
      this.commonService.findUserResult = data;
      console.log(this.commonService.findUserResult)
      this.router.navigate(['/friend/search']).then(() => {
        this.renderList = data;
      })
    })
  }

  checkStatusFriend(user: User
  ) {
    for (let i = 0; i < this.friendList.length; i++) {
      if (this.friendList[i].sentUser.id == user.id ||
        this.friendList[i].respUser.id == user.id) {
        return "Un Friend";
      }
    }
    for (let i = 0; i < this.sentPendingFriend.length; i++) {
      if (this.sentPendingFriend[i].respUser.id == user.id) {
        return "Cancel Request";
      }
    }
    for (let i = 0; i < this.confirmPendingFriend.length; i++) {
      if (this.confirmPendingFriend[i].sentUser.id == user.id) {
        return "Confirm Request";
      }
    }
    return "Add Friend";
  }

  firstLoad() {
    this.loadSentPendingFriend();
    this.loadConfirmPendingFriend();
    this.loadFriendList();
    this.loadUserInfo();
  }

  confirmActionFriend(action: string, user: User) {
    if (action == "Un Friend") {
      const chatId = this.findFriendLisByUserId(user);
      this.friendService.deleteFriend(chatId).subscribe(data => {
        console.log(data);
        this.loadFriendList();
      })
    }
    if (action == "Cancel Request") {
      const chatId = this.findSentPendingChatByRespId(user);
      this.friendService.deleteFriend(chatId).subscribe(data => {
        console.log(data);
        this.loadSentPendingFriend()
      })
    }
    if (action == "Add Friend") {
      let friendRequestDTO = new FriendRequestDTO(user);
      this.friendService.sendFriendRequest(friendRequestDTO).subscribe(data => {
        console.log(data)
        this.router.navigate(['/friend']).then();
        this.renderSwitch = true;
      })
    }
    if (action == "Confirm Request") {
      const chatId = this.findConfirmPendingChatBySentId(user);
      this.friendService.confirmFriendRequest(chatId, {status: "ACCEPT"}).subscribe(data => {
        console.log(data)
        this.loadConfirmPendingFriend();
        this.loadFriendList();
      })
    }
  }

  rejectActionFriend(action: string, user: User) {
    this.friendService.confirmFriendRequest(this.findConfirmPendingChatBySentId(user), {status: "REJECT"}).subscribe(data => {
      console.log(data)
      this.router.navigate(['/friend']).then();
      this.renderSwitch = true;
    })
  }

  findConfirmPendingChatBySentId(user: User) {
    console.log(this.confirmPendingFriend)
    for (let i = 0; i < this.confirmPendingFriend.length; i++) {
      if (user.id == this.confirmPendingFriend[i].sentUser.id) {
        return this.confirmPendingFriend[i].id;
      }
    }
    return -1;
  }

  findSentPendingChatByRespId(user: User) {
    for (let i = 0; i < this.sentPendingFriend.length; i++) {
      if (user.id == this.sentPendingFriend[i].respUser.id) {
        return this.sentPendingFriend[i].id;
      }
    }
    return -1;
  }

  findFriendLisByUserId(user: User) {
    for (let i = 0; i < this.friendList.length; i++) {
      if (user.id == this.friendList[i].sentUser.id) {
        return this.friendList[i].id;
      }
      if (user.id == this.friendList[i].respUser.id) {
        return this.friendList[i].id;
      }
    }
    return -1;
  }

  private loadUserInfo() {
    this.userService.getUserInfo().subscribe(data => {
      this.user = data;
      /*console.log(data)*/
      this.renderSwitch = true;
    });
  }

  private loadFriendList() {
    this.friendService.getFriendList().subscribe(data => {
      this.friendList = data;
      console.log(data)
      this.renderSwitch = true;
    })
  }

  private loadConfirmPendingFriend() {
    this.friendService.getConfirmPendingFriend().subscribe(data => {
      this.confirmPendingFriend = data;
      /*console.log(data)*/
      this.renderSwitch = true;
    })
  }

  private loadSentPendingFriend() {
    this.friendService.getSentPendingFriend().subscribe(data => {
      this.sentPendingFriend = data;
      /*console.log(data)*/
      this.renderSwitch = true;
    })
  }
}
