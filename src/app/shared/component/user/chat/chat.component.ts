import {Component, OnInit} from '@angular/core';
import {WebSocketAPI} from "../../../../service/websocket/WebSocketAPI";
import {chatJs} from "../../../../../assets/js/Javascrip";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  title = 'Fakebook';
  // @ts-ignore
  webSocketAPI: WebSocketAPI;
  greeting: any;
  content?: string;

  ngOnInit() {
    this.webSocketAPI = new WebSocketAPI(new ChatComponent());
    this.connect();
    chatJs();
  }

  connect() {
    this.webSocketAPI._connect();
  }

  disconnect() {
    this.webSocketAPI._disconnect();
  }

  sendMessage() {
    this.webSocketAPI._send(this.content);
    this.greeting = this.content;
  }

  handleMessage(message: any) {
    this.greeting = message;
    console.log("Handing=>>>", message)
  }
}
