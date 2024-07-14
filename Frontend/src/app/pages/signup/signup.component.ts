import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { Component } from '@angular/core';
import { inject } from '@angular/core';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  authService  =  inject(AuthService);
  router  =  inject(Router);

  

public signupForm = new FormGroup({
  LastName: new FormControl('', [Validators.required]),
  Username: new FormControl('', [Validators.required]),
  Password: new FormControl('', [Validators.required]),
  RoleId: new FormControl(2)
  
})

public onSubmit() {
  if (this.signupForm.valid) {
    console.log(this.signupForm.value);
    this.authService.signup(this.signupForm.value)
      .subscribe({
        next: (data: any) => {
          console.log(data);
          this.router.navigate(['/login']);
        },
        error: (err) => console.log(err)
      });
  }
}




}
