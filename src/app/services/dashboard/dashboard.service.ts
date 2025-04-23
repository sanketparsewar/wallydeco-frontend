import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private httpService: HttpService) { }

  getDashboardData(): Observable<any> {
    return this.httpService.secureGet(`/dashboard`);
  }
}
