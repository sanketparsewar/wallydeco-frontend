import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private BASE_URL: string;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.BASE_URL = environment.apiUrl;
  }

  getUser(userId: string): Observable<any> {
    return this.http.get<any>(`${this.BASE_URL}/user/${userId}`);
  }

  updateUser(userId: string, user: any): Observable<any> {
    return this.http.put<any>(`${this.BASE_URL}/user/${userId}`, user, {
      withCredentials: true,
    }).pipe(
      tap((response) => {
        this.authService.setLoggedUser(response.user);
      })
    );;
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete<any>(`${this.BASE_URL}/user/${id}`);
  }
}
