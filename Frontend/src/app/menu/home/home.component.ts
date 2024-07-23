import { Component, OnInit } from '@angular/core';

import { Color } from '@swimlane/ngx-charts';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from '../../layout/layout.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { RouterLink } from '@angular/router';
import { StatisticsService } from '../../services/statistics.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink,LayoutComponent,NgxChartsModule  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  storedUser = localStorage.getItem('authUser');
  user: any = JSON.parse(this.storedUser || '{}');
  token : any = localStorage.getItem('authToken');

  usersCount: number | null = null;
  TasksCount: number | null = null;
  CTasksCount: number | null = null;
  PTasksCount: number | null = null;

  chartData: any[] = [];
  
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Stats';
  showYAxisLabel = true;
  yAxisLabel = 'Count';


  isDoughnut = false;
  showLabels = true;

  constructor(private statisticsService: StatisticsService) {}

  ngOnInit(): void {
    this.loadStatistics();
  }

  loadStatistics(): void {
    this.statisticsService.getUsersCount().subscribe({
      next: (count) => {
        //console.log("count is " + count);
        this.usersCount = count;
        this.updateChartData();
      },
      error: (error) => {
        console.error('Error loading statistics', error);
      }
    });

    this.statisticsService.getTasksCount().subscribe({
      next: (count) => {
        //console.log("count is " + count);
        this.TasksCount = count;
        this.updateChartData();
      },
      error: (error) => {
        console.error('Error loading statistics', error);
      }
    });
    this.statisticsService.getCompletedTasksCount().subscribe({
      next: (count) => {
        //console.log("count is " + count);
        this.CTasksCount = count;
        this.updateChartData();
      },
      error: (error) => {
        console.error('Error loading statistics', error);
      }
    });

    this.statisticsService.getPendingTasksCount().subscribe({
      next: (count) => {
        //console.log("count is " + count);
        this.PTasksCount = count;
        this.updateChartData();
      },
      error: (error) => {
        console.error('Error loading statistics', error);
      }
    });
  }

  updateChartData(): void {
    this.chartData = [
      {
        "name": "Users",
        "value": this.usersCount
      },
      {
        "name": "Tasks",
        "value": this.TasksCount
      },
      {
        "name": "Completed Tasks",
        "value": this.CTasksCount
      },
      {
        "name": "Pending Tasks",
        "value": this.PTasksCount
      }
    ];
  }

  get userName(): string {
   // console.log(this.token);
    return this.user.FirstName + ' ' + this.user.LastName;
  }
}

