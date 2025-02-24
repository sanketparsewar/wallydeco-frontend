import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // private API_URL = 'http://localhost:8000/api';
  // private API_URL = 'https://wallydeco-backend.onrender.com/api';
  private API_URL = environment.apiUrl;

  constructor(private http: HttpClient) {}
  getBaseUrl(): string {
    return this.API_URL;
  }
}
