import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '../menu/home/home.component';

@Component({
  selector: 'app-sidebar',  
  standalone: true,
  imports: [CommonModule,RouterLink,HomeComponent,RouterLinkActive,],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent  {

 
  isOpen = true;
  notifications: string[] = []; 
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  
  }


  logout() {
    this.authService.logout();
  }

  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }


}
