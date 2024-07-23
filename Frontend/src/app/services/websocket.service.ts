import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Socket } from 'ngx-socket-io';
import WebSocket from 'ws';

@Injectable({
 providedIn: 'root',
})
export class WebsocketService {

    
    
 private webSocket: Socket;
 constructor() {
  this.webSocket = new Socket({
   url: "http://localhost:8000",
   options: {},
  });
 }


 emitEvent(eventName: string, message: any) {
    this.webSocket.emit(eventName, message);
  }

 
 connectSocket(message: any) {
  this.webSocket.connect(message);
 }

  


}