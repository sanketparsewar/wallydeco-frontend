import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private API_URL = 'http://localhost:8000/api/';

  constructor(private http:HttpClient) { }

  createOrder(orderData:any) {
    return this.http.post(`${this.API_URL}order/`, orderData);
  }
  
  getOrders() {
    return this.http.get(`${this.API_URL}order/`);
  }
  
  getOrderById(orderId:string) {
    return this.http.get(`${this.API_URL}order/${orderId}/`);
  }
  
  updateOrder(orderId:string, orderData:any) {
    return this.http.put(`${this.API_URL}order/${orderId}/`, orderData);
  }
  
  deleteOrder(orderId:string) {
    return this.http.delete(`${this.API_URL}order/${orderId}/`);
  }
}
