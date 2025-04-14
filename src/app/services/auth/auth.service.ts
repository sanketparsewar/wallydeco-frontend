import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private BASE_URL: string = environment.apiUrl;
  private loggedUserSubject = new BehaviorSubject<any>(null);
  loggedUser$ = this.loggedUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  registerUser(user: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}/auth/register`, user, {
      withCredentials: true,
    });
  }

  loginUser(user: any): Observable<any> {
    return this.http
      .post<any>(`${this.BASE_URL}/auth/login`, user, {
        withCredentials: true,
      })
      .pipe(
        tap((response) => {
          this.loggedUserSubject.next(response.user); // Store logged-in user
        })
      );
  }

  getLoggedUser(): Observable<any> {
    return this.http
      .get<any>(`${this.BASE_URL}/auth/profile`, { withCredentials: true })
      .pipe(
        tap((response) => {
          this.loggedUserSubject.next(response.user);
        })
      );
  }

  logoutUser(): Observable<any> {
    return this.http
      .get<any>(`${this.BASE_URL}/auth/logout`, { withCredentials: true })
      .pipe(
        tap(() => {
          this.loggedUserSubject.next(null);
        })
      );
  }
}
