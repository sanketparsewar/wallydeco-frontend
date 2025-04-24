import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpService } from '../http/http.service';
import { DashboardService } from '../dashboard/dashboard.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedUserSubject = new BehaviorSubject<any>(undefined);
  public loggedUser$ = this.loggedUserSubject.asObservable();

  constructor(private httpService:HttpService,private dashboardService:DashboardService) { }

  register(user: any): Observable<any> {
    return this.httpService.post('/auth/register', user);
  }

  login(user: any): Observable<any> {
    return this.httpService.post('/auth/login', user).pipe(
      tap((response:any) => {
        localStorage.setItem('accessToken', response.accessToken);
        this.loggedUserSubject.next(response.user);
        if(response.user.role === 'admin') {
          this.dashboardService.getDashboardData().subscribe()
        }
      })
    );
    
  }

  setLoggedUser(data: any) {
    this.loggedUserSubject.next(data);
  }
}
