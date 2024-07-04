import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap, switchMap} from 'rxjs/operators';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<User | null> {
    return this.http.get<User[]>(`${this.authUrl}?username=${username}&password=${password}`)
      .pipe(
        map((users: User[]) => {
          if (users && users.length > 0) {
            localStorage.setItem('currentUser', JSON.stringify(users[0]));
            return users[0];
          }
          return null;
        }),
        catchError((error: any) => {
          console.error('Login failed', error);
          return of(null);
        })
      );
  }

  register(user: User): Observable<User | null> {

    const { id, ...userWithoutId } = user;

    return this.http.post<User>(this.authUrl, userWithoutId)
      .pipe(
        tap(newUser => {

          localStorage.setItem('currentUser', JSON.stringify(newUser));
        }),
        catchError(error => {
          console.error('Registration failed', error);
          return of(null); 
        })
      );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('currentUser') !== null;
  }

  updateUser(user: User): Observable<User | null> {

    return this.http.get<User[]>(`${this.authUrl}?username=${user.username}`).pipe(
      switchMap(users => {
        if (users.length === 0) {
          console.error('User not found');
          return of(null); 
        }

        const foundUser = users[0];
        return this.http.put<User>(`${this.authUrl}/${foundUser.id}`, user).pipe(
          tap(updatedUser => {
            localStorage.setItem('currentUser', JSON.stringify(updatedUser));
          })
        );
      }),
      catchError(error => {
        console.error('Update failed', error);
        return of(null); 
      })
    );
  }
}