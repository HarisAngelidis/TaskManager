import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  private apiUrl = 'http://localhost:8000/api/';


  constructor(private http: HttpClient) { }  

  getUsersCount(): Observable<number> {
    return this.http.get<{ count: number }>(`${this.apiUrl}user/count`).pipe(
      map(response => response.count)
    );
  }
 
  getTasksCount(): Observable<number> {
    return this.http.get<{ count: number }>(`${this.apiUrl}tasks/count`).pipe(
      map(response => response.count)
    );
  }

  getCompletedTasksCount(): Observable<number> {
    return this.http.get<{ count: number }>(`${this.apiUrl}tasks/countC`).pipe(
      map(response => response.count)
    );
  }

  getPendingTasksCount(): Observable<number> {
    return this.http.get<{ count: number }>(`${this.apiUrl}tasks/countP`).pipe(
      map(response => response.count)
    );
  }

  
}
