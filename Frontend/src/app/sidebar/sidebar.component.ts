import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '../menu/home/home.component';
import { WebsocketService } from '../services/websocket.service';

@Component({
  selector: 'app-sidebar',  
  standalone: true,
  imports: [CommonModule,RouterLink,HomeComponent,RouterLinkActive,],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit,OnDestroy {


  storedUser = localStorage.getItem('authUser');
  token = localStorage.getItem('authToken');
  user: any = JSON.parse(this.storedUser || '{}');
  isAdmin :boolean = false;
  

 
  isOpen = true;
  notifications: string[] = []; 
  constructor(private authService: AuthService,private WebsocketService : WebsocketService) { }

  ngOnInit(): void {

    console.log(this.user);

    const role = this.user.RoleId;

    this.WebsocketService.connectSocket();

 
    if(role === 1){
    this.WebsocketService.listen('newTask').subscribe((data) => {
      console.log('New task received:', data);

        if (this.notifications.length >= 3) {
          this.notifications.shift(); 
        }
        this.notifications.push(`New Task Created: ${data.title}`);
    });}
  
  }

  ngOnDestroy(): void {
    this.WebsocketService.disconnect();
  }


  logout() {
    this.authService.logout();
  }

  checkAdminRole(): void {
    this.isAdmin = this.user.RoleId === 1;
  }

  

}
