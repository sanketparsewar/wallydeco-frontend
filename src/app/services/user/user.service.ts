import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { HttpService } from '../http/http.service';
import { DashboardService } from '../dashboard/dashboard.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private authService:AuthService,private httpService: HttpService,private dashboardService:DashboardService) { }
  
  getLoggedUser(): Observable<any>  {
    return this.httpService.secureGet('/user/logged').pipe(
      tap((response:any) => {
        this.authService.setLoggedUser(response.user);
        if(response.user.role === 'admin') {
          this.dashboardService.getDashboardData().subscribe()
        }
      })
    );

  }


  getUserById(userId: string): Observable<any> {
    return this.httpService.get(`/user/${userId}`);
  }

  getUsers(): Observable<any> {
    return this.httpService.get('/user');
  }

  updateUser(userId: string, user: any): Observable<any> {
    return this.httpService.securePut(`/user/${userId}`, user).pipe(
      tap((response:any) => {
        this.authService.setLoggedUser(response.user);
      })
    );
   
  }

  deleteUser(id: string): Observable<any> {
    return this.httpService.delete(`/user/${id}`);
  }

}
