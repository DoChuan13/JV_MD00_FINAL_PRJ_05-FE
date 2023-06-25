import {Component, DoCheck, EventEmitter, OnInit, Output} from '@angular/core';
import {WebSocketAPI} from "../../../../service/websocket/WebSocketAPI";
import {chatJs} from "../../../../../assets/js/Javascrip";
import {Chat, ChatDetail} from "../../../../core/model/basic/Chat";
import {ChatService} from "../../../../service/chat/chat.service";
import {UserService} from "../../../../service/user/user.service";
import {User} from "../../../../core/model/basic/User";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {ChatDetailDTO} from "../../../../core/model/ChatDetailDTO";
import {CommonService} from "../../../../service/common/common.service";
import {ConfirmDialogComponent} from "../../element/confirm-dialog/confirm-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {Const} from "../../../../core/constant/Const";
import {ChatDTO} from "../../../../core/model/ChatDTO";


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, DoCheck {
  @Output() reRenderParent = new EventEmitter<any>();
  public chatList: Chat[] = [];
  public chatDetail: ChatDetail[] = [];
  public userFindResult: User[] = [];
  public chatAvailable = "blank";
  public user?: User;
  public targetName?: string;
  public targetAvatar?: string;
  searchChat: any;
  searchUser?: string;
  chatForm = this.formBuilder.group({
    content: ['', [Validators.required, Validators.minLength(1)]]
  })
  chatDetailDTO?: ChatDetailDTO;
  catchChatDetail = false;
  public chatId?: any;
  private catchChatId?: any;
  // @ts-ignore
  webSocketAPI: WebSocketAPI;

  constructor(
    private commonService: CommonService,
    private chatService: ChatService,
    private userService: UserService,
    private activeRouter: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private dialog: MatDialog) {
  }

  ngOnInit() {
    console.log("First Load and Reload")
    this.webSocketAPI = new WebSocketAPI(
      new ChatComponent(
        this.commonService,
        this.chatService,
        this.userService,
        this.activeRouter,
        this.formBuilder,
        this.router,
        this.dialog
      ))
    ;
    this.connect();
    chatJs();
    this.loadFirstContent();
  }

  checkTargetChat(chat: Chat) {
    if (chat.sentUser?.id == this.user?.id) {
      return 1;
    }
    return 2;
  }

  connect() {
    this.webSocketAPI._connect();
  }

  disconnect() {
    this.webSocketAPI._disconnect();
  }

  sendMessage() {
    this.chatDetailDTO = new ChatDetailDTO(
      {id: this.chatId},
      this.chatForm.value.content
    )
    this.chatService.sendChatContent(this.chatDetailDTO).subscribe(data => {
      console.log(data)
    })
    this.chatForm.value.content = "";
    this.webSocketAPI._send(this.chatDetailDTO);
  }

  handleMessage(message: any) {
    /*console.log("Response =>>", JSON.parse(message))*/
    let chatId = JSON.parse(JSON.parse(message)).content;
    console.log("Detect new chat from ==> ", chatId)
    this.catchChatId = chatId;
    const userService = this.commonService.loginUser;
    this.chatService.getChatDetail(chatId).subscribe(data => {
      if (data.sentUser.id == userService?.id ||
        data.respUser.id == userService?.id) {
        console.log("Can Refresh");
        this.catchChatDetail = true;
        this.commonService.catchChatDetail = true;
      }
    })
  }

  ngDoCheck() {
    const change = this.commonService.detectChange;
    if (change == Const.DELETE_CHAT) {
      console.log("Do check==> have changed")
      this.commonService.detectChange = undefined;
      this.router.navigate(['/chat']).then();
    }
    if (this.commonService.catchChatDetail) {
      console.log("See more chat");
      this.catchChatDetail = false;
      this.commonService.catchChatDetail = false;
      this.chatService.getChatList().subscribe(data => {
        this.chatList = data;
        for (let i = 0; i < this.chatList.length; i++) {
          if (this.chatList[i].id == this.chatId) {
            // @ts-ignore
            this.chatDetail = this.chatList[i].chatDetails;
            this.showChatUserInfo();
            break;
          }
        }
      })
    }
  }

  openConfirmCommentDialog(chatId: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent,
      {
        data:
          {chat: {id: chatId}}
      });
    dialogRef.componentInstance.reRenderParent.subscribe(data => {
      this.reRenderParent.emit(data);
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  convertDate(date: any) {
    let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return new Date(date).toLocaleString('us-US', {timeZone: timezone});
  }

  private getLoginUser() {
    this.userService.getUserInfo().subscribe(data => {
      this.user = data;
      this.commonService.loginUser = data;
    })
  }

  showChatUserInfo() {
    for (let i = 0; i < this.chatList.length; i++) {
      if (this.chatId == this.chatList[i].id) {
        this.chatAvailable = "available";
        // @ts-ignore
        if (this.chatList[i].sentUser.id == this.user?.id) {
          // @ts-ignore
          this.targetName = this.chatList[i].respUser.name;
          // @ts-ignore
          this.targetAvatar = this.chatList[i].respUser.avatar;
        } else {
          // @ts-ignore
          this.targetName = this.chatList[i].sentUser.name;
          // @ts-ignore
          this.targetAvatar = this.chatList[i].sentUser.avatar;
        }
      }
    }
  }

  searchChatResult() {
    this.chatList = [];
    const chats = this.commonService.chatList;
    for (let i = 0; i < chats.length; i++) {
      // @ts-ignore
      if (chats[i].sentUser.name.toLowerCase().includes(this.searchChat?.toLowerCase())) {
        this.chatList.push(chats[i])
      }
      // @ts-ignore
      if (chats[i].respUser.name.toLowerCase().includes(this.searchChat?.toLowerCase())) {
        this.chatList.push(chats[i])
      }
    }
  }

  createNewChat() {
    this.router.navigate(['/chat/new']).then(result => {
      this.chatAvailable = "new";
    })
  }

  findUser() {
    this.userService.findByUserAccByName(this.searchUser).subscribe(data => {
      this.userFindResult = data;
    })
  }

  startNewChat(startUser: User) {
    let chatDTO = new ChatDTO(startUser);
    console.log(startUser)
    this.chatService.createNewChat(chatDTO).subscribe(data => {
      console.log(data)
      this.router.navigate(['/chat']).then();
    })
  }

  private loadFirstContent() {
    this.getChatList();
    this.getLoginUser();
    this.catchParams();
  }

  private catchParams() {
    this.activeRouter.paramMap.subscribe(data => {
      if (this.chatId != data.get('id')) {
        this.chatId = data.get('id');
        this.showChatUserInfo()
        this.commonService.chatId = data.get('id');
        this.catchChatDetail = true;
        this.commonService.catchChatDetail = true;
        console.log(data.get('id'))
      }
    })
  }

  private getChatList() {
    this.chatService.getChatList().subscribe(data => {
      this.chatList = data;
      this.commonService.chatList = data;
      this.catchChatDetail = true;
      this.commonService.catchChatDetail = true;
      /*console.log("Get Chat List==>", this.chatList)*/
    })
  }
}
