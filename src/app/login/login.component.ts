import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { sha256 } from 'js-sha256';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  standalone: true,
  template: `
    <h2>Login</h2>
    <form (submit)="login()">
      <input type="email" [(ngModel)]="user.email" name="email" placeholder="Email" required>
      <input type="password" [(ngModel)]="user.password" name="password" placeholder="Password" required>
      <button type="submit">Login</button>
    </form>
  `,
  imports: [RouterModule, FormsModule]
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
