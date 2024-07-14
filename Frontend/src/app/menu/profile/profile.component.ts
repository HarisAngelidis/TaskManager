import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import moment from 'moment';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  user: any;
  profileForm: FormGroup;

  constructor(private userService: UserService, private router: Router) {
  
    const storedUser = localStorage.getItem('authUser');
    console.log(storedUser);
    this.user = JSON.parse(storedUser || '{}');


    this.profileForm = new FormGroup({
      
      LastName: new FormControl(this.user.LastName, [Validators.required]),
      FirstName: new FormControl(this.user.FirstName, [Validators.required]),
      Age: new FormControl(this.user.Age, [Validators.required, Validators.min(1)]),
      DateOfBirth: new FormControl(moment(this.user.DateOfBirth).format('YYYY-MM-DD'), [Validators.required]),
      Username: new FormControl(this.user.Username, [Validators.required]),
      Password : new FormControl(this.user.Password, [Validators.required])
      
    });
  }

  onSubmit() {
    if (this.profileForm.valid) {
      const updatedUser = {
        ...this.user,
        ...this.profileForm.value
      };

      this.userService.updateUser(updatedUser.UserId, updatedUser).subscribe({
        next: (response) => {
          console.log(localStorage.getItem('authUser'));
          localStorage.setItem('authUser', JSON.stringify(updatedUser));

          alert('Profile updated successfully!');
          console.log(localStorage.getItem('authUser'));  
        },
        error: (err) => {
          console.error(err);
          alert('Failed to update profile.');
        }
      });
    } else {
      alert('Please fill out the form correctly.');
    }
  }
}