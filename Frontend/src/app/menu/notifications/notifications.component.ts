import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortHeader, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router, RouterLink } from '@angular/router';

import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatSortHeader,MatSort
  ],
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['notificationId','userId','title','description'];
  dataSource = new MatTableDataSource<any>([]);
  isAdmin: boolean = false;
  storedUser = localStorage.getItem('authUser');
  token = localStorage.getItem('authToken');
  user: any = JSON.parse(this.storedUser || '{}');

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private TaskService: TaskService, private router: Router) {}

  ngOnInit(): void {
    this.checkAdminRole();
    if (this.isAdmin) {
      this.loadNotifications();
    } else {
      alert('You do not have permission to view this page.');
      this.router.navigate(['/menu']);
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  checkAdminRole(): void {
    this.isAdmin = this.user.RoleId === 1;
  }

  loadNotifications(): void {
    this.TaskService.getTaskNotifications().subscribe((notifications: any) => {
      this.dataSource.data = notifications;
    });
  }
}