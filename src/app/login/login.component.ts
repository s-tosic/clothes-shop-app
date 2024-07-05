import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { sha256 } from 'js-sha256';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { User } from '../models/user';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  template: `
    <div class="login-container">
      <h2>Login</h2>
      <form (submit)="login()">
        <mat-form-field appearance="fill">
          <mat-label>Email</mat-label>
          <input matInput type="email" [(ngModel)]="user.email" name="email" placeholder="Email" required>
        </mat-form-field>
        <mat-form-field appearance="fill">
          <mat-label>Password</mat-label>
          <input matInput type="password" [(ngModel)]="user.password" name="password" placeholder="Password" required>
        </mat-form-field>
        <button mat-raised-button color="primary" type="submit">Login</button>
      </form>
    </div>
  `,
  imports: [RouterModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  styles: [`
    .login-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }

    form {
      display: flex;
      flex-direction: column;
      width: 300px;
    }

    mat-form-field {
      width: 100%;
      margin-bottom: 16px;
    }

    button {
      width: 100%;
    }
  `]
})
export class LoginComponent {
  user: User = { 
    id: 0, 
    username: '', 
    firstName: '',
    lastName: '',
    address: '',
    phone: '',
    email: '',
    password: '',
    cart: []
  };

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    if (this.user.email && this.user.password) {
      const hashedPassword = sha256(this.user.password);
      this.authService.login(this.user.email, hashedPassword).subscribe(user => {
        if (user) {
          console.log('this is the user', user);
          this.router.navigate(['/dashboard']);
        } else {
          alert('Login failed');
          console.log('Login failed: No such user exists.');
        }
      });
    } else {
      alert('Email and password are required');
    }
  }
}
