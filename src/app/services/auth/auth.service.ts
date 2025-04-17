import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private BASE_URL: string = environment.apiUrl;
  private loggedUserSubject = new BehaviorSubject<any>(undefined);
  public loggedUser$ = this.loggedUserSubject.asObservable();


  constructor(private http: HttpClient) { }

  register(user: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}/auth/register`, user);
  }

  login(user: any): Observable<any> {
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


  logout(): Observable<any> {
    return this.http
      .get<any>(`${this.BASE_URL}/auth/logout`, { withCredentials: true })
      .pipe(
        tap(() => {
          this.loggedUserSubject.next(null);
        })
      );
  }

  refreshToken() {
    return this.http.post(
      `${this.BASE_URL}/auth/refresh-token`,
      {},
      {
        withCredentials: true,
      }
    );
  }


  setLoggedUser(data: any) {
    this.loggedUserSubject.next(data);
  }
}
