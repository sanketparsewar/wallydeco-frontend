import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../http/http.service';

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
  getOrders(): Observable<any> {
    return this.httpService.get('/order');
  }

  getOrderById(orderId: string): Observable<any> {
    return this.httpService.get(`/order/${orderId}`);
  }

  cancelOrder(orderId: string): Observable<any> {
    return this.httpService.put(`/order/${orderId}/cancel`, {});
  }

  markAsDelivered(orderId: string): Observable<any> {
    return this.httpService.put(`/order/${orderId}/delivered`, {});
  }


  updateOrder(orderId: string, orderData: any): Observable<any> {
    return this.httpService.put(`/order/${orderId}`, orderData);
  }

  deleteOrder(orderId: string): Observable<any> {
    return this.httpService.delete(`/order/${orderId}`);
  }
}
