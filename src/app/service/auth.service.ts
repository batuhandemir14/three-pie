import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { AdditionalInfoUpdateModel } from '../model/additionalInfoUpdateModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 

  private apiUrl = 'https://localhost:44389/api/users/';
  private loggedInUserId: number;
 

  constructor(private http: HttpClient , private router: Router) { }

  getUserByEmail(userEmail: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getToken2() // Kullanıcı kimlik doğrulama token'ınızı buraya ekleyin
    });
  
    return this.http.get<any>(`${this.apiUrl}?user_email=${userEmail}`, { headers: headers });
  }

  getCurrentUserEmail(): string {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    return user ? user.user_email : '';
  }

  getCurrentUser(): Observable<User> {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    return of(user);
  }

  getToken2(): string {
    const token = localStorage.getItem('token');
    return token ? token : '';
  }

  

  getUserById(user_id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${user_id}`).pipe(
      map(response => response)
    );
  }
  
  setLoggedInUserId(userId: number): void {
    this.loggedInUserId = userId;
    localStorage.setItem('loggedInUserId', userId.toString());
  }

  getLoggedInUserId(): Observable<number> {
    const loggedInUserEmail = this.getCurrentUserEmail();
    return this.getUserByEmail(loggedInUserEmail).pipe(
      map((users: any[]) => {
        const currentUser = users.find((user: any) => user.User_email === loggedInUserEmail);
        if (currentUser) {
          return currentUser.User_id;
        } else {
          throw new Error('Kullanıcı bilgileri bulunamadı.');
        }
      }),
      
    );
  }
  
  login(user_email: string, user_password: string): Observable<boolean> {
    return this.http.post<{ token: string }>(`${this.apiUrl}login`, { user_email, user_password })
      .pipe(
        map(response => {
          const token = response.token;
          if (token) {
            localStorage.setItem('currentUser', JSON.stringify({ user_email, token }));
            this.getUserByEmail(user_email).subscribe(
              user => {
                this.loggedInUserId = user.user_id;
                
              },
              error => {
                console.error('User fetch error:', error);
              }
            );
            return true;
          } else {
            return false;
          }
        })
      );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('currentUser');
    
  }
  
  getToken(): string | null {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return currentUser.token || null;
  }

  updateUser(user: User): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}${user.User_id}`, user);
  }

}