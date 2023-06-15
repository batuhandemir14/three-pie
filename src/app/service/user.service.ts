import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginModel } from '../model/loginModel';
import { RegisterModel } from '../model/registerModel';
import { TokenModel } from '../model/tokenModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  private apiUrl = 'https://localhost:44389/api/Users'; // API URL'si

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  // Yeni kullanıcı kaydetme fonksiyonu
  register(user: any): Observable<RegisterModel> {
    return this.http.post<RegisterModel>(`${this.apiUrl}/register`, user);
  }

  login(loginData: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, loginData);
  }
}


