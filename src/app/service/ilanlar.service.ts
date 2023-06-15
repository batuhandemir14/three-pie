import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { Ilanlar } from '../model/ilanlar';
import { AuthService } from './auth.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IlanlarService {

  private apiUrl = 'https://localhost:44389/api/ilanlar/';

  constructor(private http: HttpClient, private authService: AuthService) { }

  ekleIlan(formData: FormData): Observable<any> {
    return this.authService.getLoggedInUserId().pipe(
      switchMap((userId: number) => {
        formData.append('user_id', userId.toString());
        return this.http.post<any>(`${this.apiUrl}`, formData).pipe(
          tap(() => {
            // İlan ekleme işlemi tamamlandıktan sonra getIlanlar metodunu çağır
            
          })
        );
      })
    );
  }

  getIlanlar(): Observable<Ilanlar[]> {
    return this.http.get<Ilanlar[]>(this.apiUrl);
  }
}
