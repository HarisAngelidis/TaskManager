import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LayoutComponent } from '../../layout/layout.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink,LayoutComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  storedUser = localStorage.getItem('authUser');
  user: any = JSON.parse(this.storedUser || '{}');
  token : any = localStorage.getItem('authToken');



  get userName(): string {
    console.log(this.token);
    return this.user.FirstName + ' ' + this.user.LastName;
  }
}

