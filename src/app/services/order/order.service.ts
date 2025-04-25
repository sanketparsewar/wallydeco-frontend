import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../http/http.service';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private httpService: HttpService) { }


  placeOrder(orderData: any): Observable<any> {
    return this.httpService.securePost('/order', orderData);
  }

  getUserOrders(): Observable<any> {
    return this.httpService.secureGet('/order/user');
  }

  getAllOrders(filters: any = {}): Observable<any> {
     let params = new HttpParams();
        Object.keys(filters).forEach((key) => {
          if (filters[key]) {
            params = params.set(key, filters[key]);
          }
        });
        return this.httpService.getWithHeader('/order', params);
  }

  getOrderById(orderId: string): Observable<any> {
    return this.httpService.get(`/order/${orderId}`);
  }

  cancelOrder(orderId: string): Observable<any> {
    return this.httpService.put(`/order/${orderId}/cancel`, {});
  }

  markAsShipped(orderId: string): Observable<any> {
    return this.httpService.securePut(`/order/${orderId}/ship`, {});
  }
  markAsDelivered(orderId: string): Observable<any> {
    return this.httpService.securePut(`/order/${orderId}/deliver`, {});
  }
  updateOrderStatus(orderId: string): Observable<any> {
    return this.httpService.securePut(`/order/${orderId}/update`, {});
  }

  deleteOrder(orderId: string): Observable<any> {
    return this.httpService.delete(`/order/${orderId}`);
  }
}
