import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  private apiUrl = 'http://localhost:8000/api/user';


  constructor(private http: HttpClient) { }  

  getUsersCount(): Observable<number> {
    return this.http.get<{ count: number }>(`${this.apiUrl}/count`).pipe(
      map(response => response.count)
    );
  }
 

  
}
