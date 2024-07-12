import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-task-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule
  ],
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.css']
})
export class TaskDialogComponent {
  taskForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.taskForm = this.fb.group({
      id: [data.id || null],
      title: [data.title, Validators.required],
      description: [data.description, Validators.required],
      userId: [data.userId]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      this.dialogRef.close(this.taskForm.value);
    }
  }
}
