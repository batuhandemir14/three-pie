import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdditionalInfoService {
  private apiUrl = 'https://localhost:44389/api/users/';
  

  constructor(private http: HttpClient, private authService: AuthService) { }

  getAdditionalInfo(): Observable<any> {
    return this.authService.getLoggedInUserId().pipe(
      switchMap((userId: number) => {
        const url = `${this.apiUrl}${userId}/additionalinfo`;
        return this.http.get<any>(url);
      })
    );
  }

  updateAdditionalInfo(additionalInfo: any): Observable<any> {
    return this.authService.getLoggedInUserId().pipe(
      switchMap((userId: number) => {
        const url = `${this.apiUrl}${userId}/additionalinfo`;
        additionalInfo.user_id = userId;
        return this.http.put<any>(url, additionalInfo);
      })
    );
  }
}