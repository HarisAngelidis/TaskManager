import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-text-input',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule,ReactiveFormsModule, RouterModule] 
})
export class DisplayComponent implements OnInit {
  userInput: string = '';
  users: any[] = [];

  constructor(private userService: UserService) {}

 
  ngOnInit() {

    console.log("o  xristis:" + localStorage.getItem('authUser'));
    const authUser = JSON.parse(localStorage.getItem('authUser')!);
console.log("Είναι ο χρήστης " + authUser.user.LastName);
    
    this.userService.getUsers().subscribe({
      next: (data: any[]) => {
        if (Array.isArray(data)) {
          this.users = data;
          console.log('Users loaded:', this.users); 
          console.error('API response is not an array:', data);
        }
      },
      error: (err) => {
        console.error('Error fetching users:', err);
      }
    });
  }
}
