import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
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

 
connectSocket(message: any) {
  this.webSocket.connect(message);
 }



}
