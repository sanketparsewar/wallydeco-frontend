import { LocalStorageService } from './../local/local-storage.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { ApiService } from '../api/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private BASE_URL: string;
  constructor(
    private http: HttpClient,
    private apiService: ApiService,
    private localStorageService: LocalStorageService
  ) {
    this.BASE_URL = this.apiService.getBaseUrl();
  }

  getUser(userId: string): Observable<any> {
    return this.http.get<any>(`${this.BASE_URL}/user/${userId}`); // Fetch the user data
  }

  updateUser(userId: string, user: any): Observable<any> {
    return this.http.put<any>(`${this.BASE_URL}/user/${userId}`, user, {
      withCredentials: true, // Allow cookies to be sent and received
    });
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete<any>(`${this.BASE_URL}/user/${id}`);
  }
}
