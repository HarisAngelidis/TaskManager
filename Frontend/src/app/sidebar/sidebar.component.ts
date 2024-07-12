import { AuthService } from '../auth/auth.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HomeComponent } from '../menu/home/home.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule,RouterLink,HomeComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  constructor(private authService: AuthService) { }
  isOpen = true;
  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
  }

  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }


}
