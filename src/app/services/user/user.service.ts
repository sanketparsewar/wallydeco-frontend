import { LocalStorageService } from './../local/local-storage.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private API_URL = 'http://localhost:8000/api';

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  private getUserIdFromToken(): string | null {
    const token = this.localStorageService.getItem('token'); // Get the token from localStorage
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token); // Decode the token
        return decodedToken.userId; // Assuming the token contains a `user_id` field
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    }
    return null;
  }

  // Method to fetch user data
  getUser() {
    const userId = this.getUserIdFromToken(); // Get the user ID from the token
    if (userId) {
      return this.http.get(`${this.API_URL}/user/${userId}`); // Fetch the user data
    } else {
      console.error('User ID not found in token');
      return null;
    }
  }

  updateUser(user: any) {
    return this.http.put(`${this.API_URL}/user/${user._id}`, user);
  }

  deleteUser(id: string) {
    return this.http.delete(`${this.API_URL}/user/${id}`);
  }
}
