import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { LayoutComponent } from '../../layout/layout.component';
import { RouterLink } from '@angular/router';
import { StatisticsService } from '../../services/statistics.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink,LayoutComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  storedUser = localStorage.getItem('authUser');
  user: any = JSON.parse(this.storedUser || '{}');
  token : any = localStorage.getItem('authToken');

  usersCount: number | null = null;

  constructor(private statisticsService: StatisticsService) {}

  ngOnInit(): void {
    this.loadStatistics();
  }

  loadStatistics(): void {
    this.statisticsService.getUsersCount().subscribe({
      next: (count) => {
        console.log("count is " + count);
        this.usersCount = count;
      },
      error: (error) => {
        console.error('Error loading statistics', error);
      }
    });
  }

  get userName(): string {
    console.log(this.token);
    return this.user.FirstName + ' ' + this.user.LastName;
  }
}

