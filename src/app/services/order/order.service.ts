import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private BASE_URL: string;
  constructor(private http: HttpClient) {
    this.BASE_URL = environment.apiUrl;
  }

  getHeader(){
    const token = localStorage.getItem('accessToken');
    return {
      headers: {
        Authorization: token || '', // token already includes 'Bearer '
      }
    };
  }

  placeOrder(orderData: any) {
    return this.http.post(`${this.BASE_URL}/order`, orderData,this.getHeader());
  }

  getOrders() {
    return this.http.get(`${this.BASE_URL}/order`);
  }

  getOrderById(orderId: string) {
    return this.http.get(`${this.BASE_URL}/order/${orderId}`);
  }

  updateOrder(orderId: string, orderData: any) {
    return this.http.put(`${this.BASE_URL}/order/${orderId}`, orderData);
  }

  deleteOrder(orderId: string) {
    return this.http.delete(`${this.BASE_URL}/order/${orderId}`);
  }
}
