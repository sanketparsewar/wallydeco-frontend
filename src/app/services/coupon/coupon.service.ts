import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class CouponService {

  constructor(private httpService: HttpService) { }

  createCoupon(data: any): Observable<any> {
    return this.httpService.post('/coupon', data);
  }

  // Apply a coupon
  applyCoupon(user: string, couponCode: string): Observable<any> {
    return this.httpService.post('/coupon/apply', { user, couponCode });
  }

  getCoupons(): Observable<any> {
    return this.httpService.get('/coupon');
  }

  // Get coupon by ID
  getCouponById(id: string): Observable<any> {
    return this.httpService.get(`/coupon/${id}`);
  }

  // Update a coupon
  updateCoupon(id: string, data: any): Observable<any> {
    return this.httpService.put(`/coupon/${id}`, data);
  }

  // Remove a coupon
  deleteCoupon(id: string): Observable<any> {
    return this.httpService.delete(`/coupon/${id}`);
  }

}
