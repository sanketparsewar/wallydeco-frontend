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

  createCoupon(data: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}/coupon`, data);
  }

   // Apply a coupon
   applyCoupon(user: string, couponCode: string): Observable<any> {
    return this.http.post(`${this.BASE_URL}/coupon/apply`, { user, couponCode });
  }

  getCoupons(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/coupon`);
  }

  // Get coupon by ID
  getCouponById(id: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/coupon/${id}`);
  }
 
  // Update a coupon
  updateCoupon(id: string, data: any): Observable<any> {
    return this.http.put(`${this.BASE_URL}/coupon/${id}`, data);
  }

  // Remove a coupon
  deleteCoupon(id: string): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/coupon/${id}`);
  }

}
