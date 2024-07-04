import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { sha256 } from 'js-sha256';
import { User } from '../models/user';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  template: `
    <h2>Register</h2>
    <form (submit)="register()">
      <input type="text" [(ngModel)]="user.username" name="username" placeholder="Username" required>
      <input type="email" [(ngModel)]="user.email" name="email" placeholder="Email" required>
      <input type="password" [(ngModel)]="user.password" name="password" placeholder="Password" required>
      <button type="submit">Register</button>
    </form>
  `,
  imports: [RouterModule, FormsModule]
})
export class RegisterComponent {
  user: User = {
    id : 0,
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

  register(): void {
    if (this.user.password) {
      this.user.password = sha256(this.user.password); 
      this.authService.register(this.user).subscribe(result => {
        if (result) {
          this.router.navigate(['/dashboard']);
        } else {
          alert('Registration failed');
        }
      });
    } else {
      alert('Password is required');
    }
  }
}
