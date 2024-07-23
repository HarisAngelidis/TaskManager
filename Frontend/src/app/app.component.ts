import { Component, OnInit } from '@angular/core';
import { NavigationEnd, RouterOutlet } from '@angular/router';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';

import { CommonModule } from '@angular/common';
import { DisplayComponent } from './display/display.component';
import { Router } from '@angular/router';
import { WebsocketService } from './services/websocket.service';

const config: SocketIoConfig = {url: '', options: {}}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,DisplayComponent,CommonModule,SocketIoModule], 
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})


export class AppComponent implements OnInit {

  showMenu: boolean = true;

  constructor(private router: Router, ){//private WebsocketService: WebsocketService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showMenu = !(event.urlAfterRedirects.includes('/login') || event.urlAfterRedirects.includes('/signup'));
      }
    });
  }

  ngOnInit(): void {
   // this.initializeSocketConnection();
  }

  /*initializeSocketConnection() {
    this.WebsocketService.connectSocket('message');
    this.WebsocketService.emitEvent('join', 'admin');
   }*/



  title = 'Task Manager';


}




