import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CouponService {

  private BASE_URL: string;
    constructor(
      private http: HttpClient,
    ) {
          this.BASE_URL = environment.apiUrl;
      
    }

  getCoupons(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/coupon`);
  }

  // Get coupon by ID
  getCouponById(id: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/coupon/${id}`);
  }

  // Apply a coupon
  applyCoupon(userId: string, couponCode: string): Observable<any> {
    return this.http.post(`${this.BASE_URL}/coupon/apply`, { userId, couponCode });
  }

  // Remove a coupon
  deleteCoupon(id:string): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/coupon/${id}`);
  }

}
