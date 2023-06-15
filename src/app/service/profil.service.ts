import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user';


@Injectable({
  providedIn: 'root'
})
export class ProfilService { private apiUrl = 'https://localhost:44389/api/Users'; // Kullanıcılar API URL'si

constructor(private http: HttpClient) { }

getUser(): Observable<User> {
  // Kullanıcı bilgilerini veritabanından al
  return this.http.get<User>(`${this.apiUrl}`);
}
}