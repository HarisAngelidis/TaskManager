import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { inject } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  host: {ngSkipHydration: 'true'},
})
export class LoginComponent {

  authService = inject(AuthService);
  router = inject(Router);
  loginError: string | null = null;

  protected loginForm = new FormGroup({
    Username: new FormControl('', [Validators.required]),
    Password: new FormControl('', [Validators.required])
  })

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (data: any) => {
          this.router.navigate(['/menu']);
        },
        error: (err) => {
        
          this.loginError = 'Invalid username or password';
        }
      });
    } else {
      
      this.loginError = 'Please enter both username and password'; 
    }
    console.log(this.loginError);
  }
}