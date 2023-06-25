import {Component, DoCheck, OnInit} from '@angular/core';
import {WebSocketAPI} from "../../../../service/websocket/WebSocketAPI";
import {chatJs} from "../../../../../assets/js/Javascrip";
import {Chat, ChatDetail} from "../../../../core/model/basic/Chat";
import {ChatService} from "../../../../service/chat/chat.service";
import {UserService} from "../../../../service/user/user.service";
import {User} from "../../../../core/model/basic/User";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {ChatDetailDTO} from "../../../../core/model/ChatDetailDTO";
import {CommonService} from "../../../../service/common/common.service";


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, DoCheck {
  public chatList: Chat[] = [];
  public chatDetail: ChatDetail[] = [];
  public user?: User;
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
    private router: ActivatedRoute,
    private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    console.log("First Load and Reload")
    this.webSocketAPI = new WebSocketAPI(
      new ChatComponent(
        this.commonService,
        this.chatService,
        this.userService,
        this.router,
        this.formBuilder
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
    const chatIdService = this.commonService.chatId;
    const userService = this.commonService.loginUser;
    this.chatService.getChatDetail(chatId).subscribe(data => {
      if (data.sentUser.id == userService?.id ||
        data.respUser.id == userService?.id) {
        console.log("Can Refresh");
        this.catchChatDetail = true;
        this.commonService.catchChatDetail = true;
        //     console.log("Before==>", this.chatDetail);
        //     this.chatService.getChatList().subscribe(data => {
        //       this.chatList = data;
        //       console.log(this.chatList)
        //       for (let i = 0; i < this.chatList.length; i++) {
        //         console.log(this.chatList[i].id)
        //         console.log(this.chatId)
        //         if (this.chatList[i].id == this.chatId) {
        //           // @ts-ignore
        //           this.chatDetail = this.chatList[i].chatDetails;
        //           break;
        //         }
        //       }
        //     })
        //     console.log("After==>", this.chatDetail);
      }
    })
  }

  ngDoCheck() {
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
            break;
          }
        }
      })
    }
  }


  private loadFirstContent() {
    this.getChatList();
    this.getLoginUser();
    this.catchParams();
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

  private catchParams() {
    this.router.paramMap.subscribe(data => {
      if (this.chatId != data.get('id')) {
        this.chatId = data.get('id');
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
      this.catchChatDetail = true;
      this.commonService.catchChatDetail = true;
      console.log("Get Chat List==>", this.chatList)
    })
  }
}
