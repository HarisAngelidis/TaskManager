import { Inject, Injectable, PLATFORM_ID, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Socket } from 'ngx-socket-io';
import WebSocket from 'ws';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
 providedIn: 'root',
})
export class WebsocketService {

  private isBrowser = false;
  private webSocket: Socket | undefined;
    
    

 constructor(@Inject(PLATFORM_ID) private platformId: Object) {

this.isBrowser = isPlatformBrowser(this.platformId);

if(this.isBrowser){
this.webSocket = new Socket({
  url: "http://localhost:8000",
  options: {},
 });
 
 }
}

 
connectSocket(): void {
  if (this.webSocket) {
    this.webSocket.connect();
  }
}

listen(eventName: string): Observable<any> {
  if (this.webSocket) {
    return this.webSocket.fromEvent(eventName);
  }
  return new Observable();
}

disconnect(): void {
  if (this.webSocket) {
    this.webSocket.disconnect();
  }
}
  


}