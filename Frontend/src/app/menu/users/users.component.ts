import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { AuthInterceptor } from '../../auth.interceptor';
import { CommonModule } from '@angular/common';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  isAdmin: boolean = false;
  storedUser = localStorage.getItem('authUser');
  token = localStorage.getItem('authToken');
  user: any = JSON.parse(this.storedUser || '{}');

  constructor(private userService: UserService, private router: Router,private authInter:AuthInterceptor) {}

  ngOnInit(): void {
    this.checkAdminRole();
    if (this.isAdmin) {
      this.loadUsers();
    } else {
      alert('You do not have permission to view this page.');
      this.router.navigate(['/menu']); 
    }
  }


   

  checkAdminRole(): void {
  
    this.isAdmin = this.user.RoleId === 1;
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe((users: any) => {
      this.users = users;
    });
  }
}
  