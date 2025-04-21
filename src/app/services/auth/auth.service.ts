import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedUserSubject = new BehaviorSubject<any>(undefined);
  public loggedUser$ = this.loggedUserSubject.asObservable();

  constructor(private httpService:HttpService) { }

  register(user: any): Observable<any> {
    return this.httpService.post('/auth/register', user);
  }

  login(user: any): Observable<any> {
    return this.httpService.post('/auth/login', user).pipe(
      tap((response:any) => {
        localStorage.setItem('accessToken', response.accessToken);
        this.loggedUserSubject.next(response.user); 
      })
    );
    
  }

  setLoggedUser(data: any) {
    this.loggedUserSubject.next(data);
  }
}
