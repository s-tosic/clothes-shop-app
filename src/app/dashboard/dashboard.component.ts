import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../auth.service';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { CompletedOrdersComponent } from '../completed-orders/completed-orders.component';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    UserDialogComponent,
    CompletedOrdersComponent,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    NgFor,
    NgIf
  ],
  template: `
    <h1>Dashboard</h1>
    <table mat-table [dataSource]="userFields" class="mat-elevation-z8">
      <ng-container matColumnDef="label">
        <th mat-header-cell *matHeaderCellDef> Field </th>
        <td mat-cell *matCellDef="let field"> {{field.label}} </td>
      </ng-container>

      <ng-container matColumnDef="value">
        <th mat-header-cell *matHeaderCellDef> Value </th>
        <td mat-cell *matCellDef="let field"> {{ user[field.key] }} </td>
      </ng-container>

      <ng-container matColumnDef="actions">
        <th mat-header-cell *matHeaderCellDef> Actions </th>
        <td mat-cell *matCellDef="let field">
          <button mat-raised-button color="primary" (click)="openDialog(field.key, user[field.key])">Change</button>
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
    </table>
    <app-completed-orders></app-completed-orders>
  `,
  styles: [`
    table {
      width: 100%;
      margin-bottom: 16px;
    }

    .mat-elevation-z8 {
      box-shadow: 0px 3px 3px -2px rgba(0, 0, 0, 0.2), 
                  0px 3px 4px 0px rgba(0, 0, 0, 0.14), 
                  0px 1px 8px 0px rgba(0, 0, 0, 0.12);
    }

    h1 {
      margin-bottom: 16px;
    }
  `]
})
export class DashboardComponent implements OnInit {
  user: any = null;
  displayedColumns: string[] = ['label', 'value', 'actions'];
  userFields = [
    { key: 'username', label: 'Username' },
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
