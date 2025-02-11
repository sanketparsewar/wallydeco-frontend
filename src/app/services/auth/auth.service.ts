import { ApiService } from './../api/api.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private BASE_URL: string;

  constructor(private http: HttpClient, private apiService: ApiService) {
    this.BASE_URL = apiService.getBaseUrl();
  }

  registerUser(user: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}/auth/register`, user, {
      withCredentials: true, // Ensure cookies are stored
    });
  }

  loginUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.BASE_URL}/auth/login`, user, {
      withCredentials: true, // Allow cookies to be sent and received
    });
  }

  getLoggedUser(): Observable<any> {
    return this.http.get<any>(`${this.BASE_URL}/auth/profile`, {
      withCredentials: true, // Ensures cookies are sent with the request
    });
  }

  logoutUser(): Observable<any> {
    return this.http.get<any>(`${this.BASE_URL}/auth/logout`, {
      withCredentials: true, // Ensure cookies are sent
    });
  }
  
}
