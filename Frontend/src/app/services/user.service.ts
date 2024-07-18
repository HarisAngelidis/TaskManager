import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8000/api/user';
  private isAuthenticated = false;

  constructor(private http: HttpClient) { }


  login(username: string, password: string): Observable<boolean> {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password }).pipe(
      map(response => {
        if (response.success) {
          this.isAuthenticated = true;
          localStorage.setItem('currentUser', JSON.stringify(response.user));
          return true;
        } else {
          return false;
        }
      })
    );
  }


  getUsers(): Observable<any[]> {
    const authToken = localStorage.getItem('authToken');

  
    
    return this.http.get<any>(this.apiUrl).pipe(
      
      map(response => response.result) 
    );
  }   
 
  
  updateUser(id: number, userData: any): Observable<any> {
    const authToken = localStorage.getItem('authToken'); 
    return this.http.put(`${this.apiUrl}/${id}`, userData);
  }

  getUsersCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/users/count`);
  }

  
}
