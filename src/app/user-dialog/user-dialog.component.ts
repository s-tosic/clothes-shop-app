import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-user-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  template: `
<h1 mat-dialog-title>Update {{ data.field | titlecase }}</h1>
<div mat-dialog-content>
  <mat-form-field appearance="fill">
    <mat-label>New {{ data.field }}</mat-label>
    <input matInput [(ngModel)]="data.value">
  </mat-form-field>
</div>
<div mat-dialog-actions>
  <button mat-button (click)="onCancel()">Cancel</button>
  <button mat-button [mat-dialog-close]="data" cdkFocusInitial>Update</button>
</div>
  `
})
export class UserDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onCancel(): void {
    this.dialogRef.close();
  }
}
