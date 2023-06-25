import {Component, DoCheck, OnInit} from '@angular/core';
import {WebSocketAPI} from "../../../../service/websocket/WebSocketAPI";
import {chatJs} from "../../../../../assets/js/Javascrip";
import {Chat} from "../../../../core/model/basic/Chat";
import {ChatService} from "../../../../service/chat/chat.service";
import {UserService} from "../../../../service/user/user.service";
import {User} from "../../../../core/model/basic/User";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {ChatDetailDTO} from "../../../../core/model/ChatDetailDTO";


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, DoCheck {
  public chatList: Chat[] = [];
  chatForm = this.formBuilder.group({
    content: ['', [Validators.required, Validators.minLength(1)]]
  })
  chatDetail?: ChatDetailDTO;
  catchNewChat = false;
  private chatId?: any;
  private catchChatId?: any;
  private user?: User;
  // @ts-ignore
  webSocketAPI: WebSocketAPI;
  greeting: any;

  constructor(private chatService: ChatService,
              private userService: UserService,
              private router: ActivatedRoute,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.webSocketAPI = new WebSocketAPI(
      new ChatComponent(
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
    this.chatDetail = new ChatDetailDTO(
      {id: this.chatId},
      this.chatForm.value.content
    )
    this.chatForm.value.content = "";
    this.webSocketAPI._send(this.chatDetail);
  }

  handleMessage(message: any) {
    /*console.log("Response =>>", JSON.parse(message))*/
    let chatId = JSON.parse(JSON.parse(message)).content;
    console.log("Detect new chat from ==> ", chatId)
    this.catchChatId = chatId;
    this.catchNewChat = true;
    this.getLoginUser();
    this.chatService.getChatDetail(chatId).subscribe(data => {
      if (data.sentUser.id == this.user?.id ||
        data.respUser.id == this.user?.id) {
        console.log("Can Refresh")
        this.getChatList();
      }
    })
    // if (this.checkValidAccessChat(chatId)) {
    //   console.log("Rerender")
    // }
  }

  ngDoCheck() {
  }

  private checkValidAccessChat(detectId: any): boolean {
    for (let i = 0; i < this.chatList.length; i++) {
      console.log("Current Id==>", this.chatList[i].id)
      if (this.chatList[i].id == detectId) {
        return true;
      }
    }
    return false;
  }

  private loadFirstContent() {
    this.getChatList();
    this.getLoginUser();
    this.catchParams();
  }

  private catchParams() {
    this.router.paramMap.subscribe(data => {
      this.chatId = data.get('id');
      console.log(data.get('id'))
    })
  }

  private getLoginUser() {
    this.userService.getUserInfo().subscribe(data => {
      this.user = data;
    })
  }

  private getChatList() {
    this.chatService.getChatList().subscribe(data => {
      this.chatList = data;
    })
  }
}
