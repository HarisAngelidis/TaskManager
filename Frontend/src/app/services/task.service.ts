import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private baseUrl = 'http://localhost:8000/api/tasks';

  constructor(private http: HttpClient) {}

  getTasks(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${userId}`);
  }

  addTask(task: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/${task.userId}`, task);
  }

  updateTask(taskId:number,task: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${taskId}`, task);
  }

  deleteTask(taskId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${taskId}`);
  }
}

