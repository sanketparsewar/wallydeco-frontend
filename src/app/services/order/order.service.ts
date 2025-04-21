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

  getOrders(): Observable<any> {
    return this.httpService.get('/order');
  }

  getOrderById(orderId: string): Observable<any> {
    return this.httpService.get(`/order/${orderId}`);
  }

  updateOrder(orderId: string, orderData: any): Observable<any> {
    return this.httpService.put(`/order/${orderId}`, orderData);
  }

  deleteOrder(orderId: string): Observable<any> {
    return this.httpService.delete(`/order/${orderId}`);
  }
}
