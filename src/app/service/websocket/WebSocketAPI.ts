import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {ChatComponent} from "../../shared/component/user/chat/chat.component";
import {environment} from "../../../environments/environment";
import {HttpHeaders} from "@angular/common/http";

export class WebSocketAPI {
  webSocketEndPoint: string = environment.API+'ws';
  topic: string = "/topic/chat";
  stompClient: any;
  chatComponent: ChatComponent;

  constructor(chatComponent: ChatComponent) {
    this.chatComponent = chatComponent;
  }

  _connect() {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Access-Control-Allow-Headers', 'Content-Type')
      .append('Access-Control-Allow-Methods', 'GET',)
      .append('Access-Control-Allow-Methods', 'POST',)
      .append('Access-Control-Allow-Methods', 'PUT',)
      .append('Access-Control-Allow-Methods', 'PATCH',)
      .append('Access-Control-Allow-Methods', 'DELETE',)
      .append('Access-Control-Allow-Origin', '*');
    console.log("Initialize WebSocket Connection");
    let ws = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(ws);
    const _this = this;
    _this.stompClient.connect(headers, function () {
      _this.stompClient.subscribe(_this.topic, function (sdkEvent: any) {
        _this.onMessageReceived(sdkEvent);
      });
      //_this.stompClient.reconnect_delay = 2000;
    }, this.errorCallBack);
  };

  _disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
    console.log("Disconnected");
  }

  // on error, schedule a reconnection attempt
  errorCallBack(error: any) {
    console.log("errorCallBack -> " + error)
    setTimeout(() => {
      this._connect();
    }, 5000);
  }

  /**
   * Send message to sever via web socket
   * @param {*} message
   */
  _send(message: any) {
    console.log("calling logout api via web socket");
    this.stompClient.send("/app/hello", {}, JSON.stringify(message));
  }

  onMessageReceived(message: any) {
    console.log("Message Received from Server :: " + message);
    this.chatComponent.handleMessage(JSON.stringify(message.body));
  }
}
