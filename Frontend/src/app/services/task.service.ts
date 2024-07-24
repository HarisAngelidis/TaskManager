import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private baseUrl = 'http://localhost:8000/api/tasks';
  private baseUrl2 = 'http://localhost:8000/api/taskItems';

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

  updateStatus(taskId:number,task: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${taskId}/status`, task);
  }

  deleteTask(taskId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${taskId}`);
  }

  getTaskItems(taskId: number): Observable<any> {
    return this.http.get(`${this.baseUrl2}/${taskId}`);
  }

  addTaskItem(taskId: number, item: any): Observable<any> {
    return this.http.post(`${this.baseUrl2}/${taskId}`, item);
  }

  updateTaskItem(itemId: number, item: any): Observable<any> {
    return this.http.put(`${this.baseUrl2}/${itemId}`, item);
  }

  deleteTaskItem( itemId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl2}/${itemId}`);
  }

  uploadTaskFile(taskId: number, file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.baseUrl}/${taskId}/upload`, formData);
  }

  getTaskFile(taskId: number) {
    return this.http.get(`${this.baseUrl}/${taskId}/file`, { responseType: 'blob' });
  }

  deleteTaskFile(taskId: number) : Observable<any>{
    return this.http.delete(`${this.baseUrl}/${taskId}/file`);
  }

  getTaskNotifications(): Observable<any> {
    return this.http.get(`${this.baseUrl}/Notifications`);
  }

  getTaskNotification(notId : number): Observable<any> {
    return this.http.get(`http://localhost:8000/api/tasks/Notification/${notId}`);
  }

 
  
}

