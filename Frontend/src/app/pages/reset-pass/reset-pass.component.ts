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
  templateUrl: './reset-pass.component.html',
  styleUrl: './reset-pass.component.scss',
  host: {ngSkipHydration: 'true'},
})
export class ResetPassComponent {

  authService = inject(AuthService);
  router = inject(Router);
  resetError: string | null = null;
  

  protected resetForm = new FormGroup({
    Username: new FormControl('', [Validators.required]),
  })



  onSubmit() {
    if (this.resetForm.valid) {
      this.authService.forgotPassword(this.resetForm.value.Username).subscribe({
        next: (data: any) => {
          this.router.navigate(['/login']);
        },
        error: (err) => {
        
          this.resetError = 'Invalid username';
        }
      });
    } else {
      
      this.resetError = 'Please enter a username '; 
    }
    console.log(this.resetError);
  }
}