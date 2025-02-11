import { LocalStorageService } from './../local/local-storage.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { ApiService } from '../api/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private BASE_URL: string;
    constructor(private http: HttpClient, private apiService: ApiService,private localStorageService:LocalStorageService) {
      this.BASE_URL = this.apiService.getBaseUrl();
    }

  // private getUserIdFromToken(): string | null {
  //   const token = this.localStorageService.getItem('token'); // Get the token from localStorage
  //   if (token) {
  //     try {
  //       const decodedToken: any = jwtDecode(token); // Decode the token
  //       return decodedToken.userId; // Assuming the token contains a `user_id` field
  //     } catch (error) {
  //       console.error('Error decoding token:', error);
  //       return null;
  //     }
  //   }
  //   return null;
  // }

  // Method to fetch user data
  getUser(userId:string):Observable<any> {
    // const userId = this.getUserIdFromToken(); // Get the user ID from the token
    // if (userId) {
      return this.http.get<any>(`${this.BASE_URL}/user/${userId}`); // Fetch the user data
    // } else {
    //   console.error('User ID not found in token');
    //   return null;
    // }
  }

  
  updateUser(userId:string,user: any):Observable<any> {
    return this.http.put<any>(`${this.BASE_URL}/user/${userId}`, user);
  }

  deleteUser(id: string):Observable<any> {
    return this.http.delete<any>(`${this.BASE_URL}/user/${id}`);
  }
}
