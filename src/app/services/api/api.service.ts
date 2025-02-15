import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // private API_URL = 'http://localhost:8000/api';
  private API_URL = 'https://wallydeco-backend.onrender.com/api';

  constructor() {}

  getBaseUrl(): string {
    return this.API_URL;
  }
}
