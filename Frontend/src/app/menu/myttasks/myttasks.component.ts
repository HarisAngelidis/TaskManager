import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { TaskService } from '../../task.service';

@Component({
  selector: 'app-myttasks',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, MatButtonModule, MatInputModule, MatCardModule, MatListModule],
  templateUrl: './myttasks.component.html',
  styleUrls: ['./myttasks.component.css']
})
export class MyTasksComponent implements OnInit {
  tasks: any[] = [];
  addTaskForm: FormGroup;
  editTaskForm: FormGroup | null = null;

  storedUser = localStorage.getItem('authUser');
  user: any = JSON.parse(this.storedUser || '{}');

  userId: number = this.user.UserId;

  constructor(private fb: FormBuilder, private taskService: TaskService) {
    this.addTaskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      userId: [this.userId]
    });

    this.editTaskForm = this.fb.group({
      id: [null],
      title: ['', Validators.required],
      description: ['', Validators.required],
      userId: [this.userId]
    });
  }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    
    this.taskService.getTasks(this.userId).subscribe((tasks: any) => {
      console.log(tasks[0].title); 

      this.tasks = tasks;
    });
  }

  onAddSubmit(): void {
    if (this.addTaskForm.valid) {
      this.taskService.addTask(this.addTaskForm.value).subscribe(() => {
        this.loadTasks();
        this.addTaskForm.reset({ userId: this.userId });
      });
    }
  }

  onEditSubmit(): void {
    if (this.editTaskForm && this.editTaskForm.valid) {
      this.taskService.updateTask(this.editTaskForm.value.id, this.editTaskForm.value).subscribe(() => {
        this.loadTasks();
        this.editTaskForm!.reset({ userId: this.userId });
        //this.editTaskForm = null;
      });
    }
  }

  editTask(task: any): void {
    console.log(task);
    
    this.editTaskForm?.patchValue(task);
  }

  deleteTask(taskId: number): void {
    this.taskService.deleteTask(taskId).subscribe(() => {
      this.loadTasks();
    });
  }
}
