import { Router, RouterModule } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  router = inject(Router);

  constructor() { }

  httpClient = inject(HttpClient);
  baseUrl = 'http://localhost:8000/api/user';

  login(data: any) {
    return this.httpClient.post<any>(`${this.baseUrl}/login`, data)
      .pipe(tap((result) => {
        if (result.success) {
          localStorage.setItem('authUser', JSON.stringify(result.user));
          localStorage.setItem('authToken', result.token);
          
        } else {
          throw new Error('Login failed');
        }
      }));
  }

isLoggedIn() {
  
  
  return localStorage.getItem('authUser') !== null;
}

signup(data: any) {
  
  return this.httpClient.post(`${this.baseUrl}`, data );
}

logout() {

  this.router.navigate(['/']);
  localStorage.removeItem('authUser');
  localStorage.removeItem('authToken');
}
}
