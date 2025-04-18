import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { Observable } from 'rxjs';

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

  placeOrder(orderData: any) : Observable<any> {
    return this.http.post<any>(`${this.BASE_URL}/order`, orderData,this.getHeader());
  }

  getOrders() : Observable<any> {
    return this.http.get<any>(`${this.BASE_URL}/order`);
  }

  getOrderById(orderId: string): Observable<any>  {
    return this.http.get<any>(`${this.BASE_URL}/order/${orderId}`);
  }

  updateOrder(orderId: string, orderData: any): Observable<any>  {
    return this.http.put<any>(`${this.BASE_URL}/order/${orderId}`, orderData);
  }

  deleteOrder(orderId: string): Observable<any>  {
    return this.http.delete<any>(`${this.BASE_URL}/order/${orderId}`);
  }
}
