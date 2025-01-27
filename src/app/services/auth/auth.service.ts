import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API_URL = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}
  registerUser(user: any) {
    return this.http.post(`${this.API_URL}/auth/register`, user);
  }

  loginUser(user: any):Observable<any> {
    return this.http.post<any>(`${this.API_URL}/auth/login`, user);
  }
}
