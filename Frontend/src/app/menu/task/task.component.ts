import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [],
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  task: any;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const notId = +params['id'];
      
     
      this.loadTask(notId);
    });
  }

  loadTask(notId: number): void {
    this.taskService.getTaskNotification(notId).subscribe({
      next: (result) => {
        console.log(result[0]);
        this.task = result[0];
       
      },
      error: (error) => {
        console.log("sdfsdf");
        console.error('Error loading statistics', error);
      }
    });
  }
}