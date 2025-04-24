import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private dashboardSubject = new BehaviorSubject<any>(null);
  public dashboard$ = this.dashboardSubject.asObservable();

  constructor(private httpService: HttpService) { }

  getDashboardData(): Observable<any> {
    return this.httpService.secureGet(`/dashboard`).pipe(
      tap((data: any) => {
        this.dashboardSubject.next(data);
      }
      )
    );
  }
}
