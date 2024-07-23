import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFooterRowDef, MatHeaderRowDef, MatRowDef, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatSort, MatSortHeader, MatSortModule } from '@angular/material/sort';

import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginator } from '@angular/material/paginator';
import { RouterLink } from '@angular/router';
import { TaskDialogComponent } from './task-dialog/task-dialog.component';
import { TaskItemDialogComponent } from './task-item-dialog/task-item-dialog.component';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-myttasks',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatListModule,
    MatTableModule,
    MatDialogModule,
    MatPaginator,
    MatIcon,
    MatSort,
    MatSortHeader,
    MatSortModule,
    MatInputModule,
    FormsModule,
    MatSelect,
    MatOption,
    MatRowDef,
    MatFooterRowDef,
    MatHeaderRowDef,
    
  
  ],
  templateUrl: './myttasks.component.html',
  styleUrls: ['./myttasks.component.scss']
})
export class MyTasksComponent implements OnInit {
  displayedColumns: string[] = ['title', 'description','status','filePath', 'actions',];
  displayedColumnsItems: string[] = ['title','actions',];
  dataSource = new MatTableDataSource<any>([]);
  dataSourceItems = new MatTableDataSource<any>([]);
  storedUser = localStorage.getItem('authUser');
  user: any = JSON.parse(this.storedUser || '{}');
  userId: number = this.user.UserId;
  isAdmin: boolean = this.user.RoleId === 1;
  showDetail: boolean = false;
  selectedTask: any;


  statusMap: { [key: number]: string } = {
    1: 'Pending',
    2: 'Completed'
  };
  statusOptions = [
    { value: 1, label: 'Pending' },
    { value: 2, label: 'Completed' }
  ];
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private fb: FormBuilder, private taskService: TaskService, public dialog: MatDialog) {}

  ngOnInit(): void {
    if (this.isAdmin) {
      this.displayedColumns = ['userId', ...this.displayedColumns];
    }
    this.loadTasks();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSourceItems.paginator = this.paginator;
    this.dataSourceItems.sort = this.sort;
  }
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSourceItems.filter = filterValue.trim().toLowerCase();


    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    if (this.dataSourceItems.paginator) {
      this.dataSourceItems.paginator.firstPage();
    }
  }

  loadTasks(): void {
    this.taskService.getTasks(this.userId).subscribe((tasks: any) => {
      this.dataSource.data = tasks.map((task: any) => {
        task.status = this.statusMap[task.statusId];
        return task;
      });
    });
  }

  openDialog(task: any = null): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '400px',
      data: task ? { ...task } : { title: '', description: '', userId: this.userId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.id) {
          this.taskService.updateTask(result.id, result).subscribe(() => this.loadTasks());
        } else {
          this.taskService.addTask(result).subscribe(() => this.loadTasks());
        }
      }
    });
  }

  openDialogItem(item: any = null): void {

    console.log(this.selectedTask);
  
    const dialogRef = this.dialog.open(TaskItemDialogComponent, {
      width: '400px',
      
      data: item ? { ...item } : { title: '',taskId: this.selectedTask.id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.itemId) {
          this.taskService.updateTaskItem(result.itemId, result).subscribe(() => this.loadTaskItems());
        } else {
          this.taskService.addTaskItem(result.taskId,result).subscribe(() => this.loadTaskItems());
        }
      }
    });
  }

  deleteTask(taskId: number): void {
    this.taskService.deleteTask(taskId).subscribe(() => {
      this.loadTasks();
    });
  }

  changeStatus(task: any): void {
    if(this.user.UserId!=task.userId){
      
      alert("Den einai diko sou auto palikari");
      this.loadTasks();
      
      return;}
    console.log(task.statusId);
    const newStatusId = task.statusId === 1 ? 1 : 2; 
    console.log(newStatusId);
    const updatedTask = { ...task, statusId: newStatusId };
    console.log(updatedTask);

    this.taskService.updateStatus(updatedTask.id, updatedTask).subscribe(() => {

      console.log(`Task ${updatedTask.id} status updated successfully`);
      console.log(updatedTask);
      console.log(updatedTask.statusId);
      this.loadTasks(); 
    });
  }

  loadTaskItems(): void {
    this.taskService.getTaskItems(this.selectedTask.id).subscribe((taskItems: any) => {
      this.dataSourceItems.data = taskItems.map((taskItem: any) => {
      
        return taskItem;
      });
    });
  }
  showTaskDetail(task: any): void {
    this.showDetail = true;
    this.selectedTask = task;
    console.log(this.selectedTask);


  this.loadTaskItems();
    
  }

  deleteTaskItem(itemId: number): void {
    this.taskService.deleteTaskItem(itemId).subscribe(() => {
      this.loadTaskItems();
    });
  }

  uploadFile(event: any, taskId: number): void {
    const file = event.target.files[0];
    if (file) {
      this.taskService.uploadTaskFile(taskId, file).subscribe(() => {
        this.loadTasks();
      });
    }
  }

  downloadFile(taskId: number): void {
    this.taskService.getTaskFile(taskId).subscribe((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `task_${taskId}_file`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    });
  }

  deleteFile(taskId: number): void {
    this.taskService.deleteTaskFile(taskId).subscribe({
      next: (response) => {
        console.log('File deleted successfully', response);
        this.loadTasks(); 
      },
      error: (error) => {
        console.error('Error deleting file', error);
      }
    });
  }
}






