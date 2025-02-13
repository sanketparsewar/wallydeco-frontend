import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private BASE_URL: string;
    constructor(private http: HttpClient, private apiService: ApiService) {
      this.BASE_URL = apiService.getBaseUrl();
    }
  createOrder(orderData:any) {
    return this.http.post(`${this.BASE_URL}/order/`, orderData);
  }
  
  getOrders() {
    return this.http.get(`${this.BASE_URL}/order/`);
  }
  
  getOrderById(orderId:string) {
    return this.http.get(`${this.BASE_URL}/order/${orderId}/`);
  }
  
  updateOrder(orderId:string, orderData:any) {
    return this.http.put(`${this.BASE_URL}/order/${orderId}/`, orderData);
  }
  
  deleteOrder(orderId:string) {
    return this.http.delete(`${this.BASE_URL}/order/${orderId}/`);
  }
}
