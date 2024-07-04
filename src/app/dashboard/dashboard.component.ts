import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../auth.service';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CompletedOrdersComponent } from '../completed-orders/completed-orders.component';



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [UserDialogComponent, CompletedOrdersComponent],
  template: `
<h1>Dashboard</h1>
<table class="table">
  <tr>
    <td>Username</td>
    <td>{{ user.username }}</td>
  </tr>
  @for (field of userFields; track $index ) {
  <tr >
    <td>{{ field.label }}</td>
    <td>{{ user[field.key] }}</td>
    <td><button class="btn btn-primary" (click)="openDialog(field.key, user[field.key])">Change</button></td>
  </tr>
}
</table>
<app-completed-orders></app-completed-orders>
`
})
export class DashboardComponent implements OnInit {
  user: any = null;
  userFields = [
    { key: 'firstName', label: 'First Name' },
    { key: 'lastName', label: 'Last Name' },
    { key: 'address', label: 'Address' },
    { key: 'phone', label: 'Phone Number' },
    { key: 'email', label: 'Email' }
  ];

  constructor(private authService: AuthService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser(): void {
    const userData = localStorage.getItem('currentUser');
    this.user = userData ? JSON.parse(userData) : null;
  }

  openDialog(field: string, value: string): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '250px',
      data: { field: field, value: value }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.value !== this.user[result.field]) {
        this.user[result.field] = result.value;
        this.authService.updateUser(this.user).subscribe(() => {
          localStorage.setItem('currentUser', JSON.stringify(this.user));
        });
      }
    });
  }
}
