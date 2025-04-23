import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private BASE_URL: string;
  constructor(private http: HttpClient) {
    this.BASE_URL = environment.apiUrl;
  }

  getHeader() {
    const token = localStorage.getItem('accessToken');
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    };
  }

  secureGet(apiEndPoint: string, params?: any) {
    return this.http.get(`${this.BASE_URL}${apiEndPoint}`, { ...this.getHeader(), params });
  }
  securePost(apiEndPoint: string, body: any) {
    return this.http.post(`${this.BASE_URL}${apiEndPoint}`, body, this.getHeader());
  }
  securePut(apiEndPoint: string, body: any) {
    return this.http.put(`${this.BASE_URL}${apiEndPoint}`, body, this.getHeader());
  }
  secureDelete(apiEndPoint: string) {
    return this.http.delete(`${this.BASE_URL}${apiEndPoint}`, this.getHeader());
  }


  get(apiEndPoint: string, params?: any) {
    return this.http.get(`${this.BASE_URL}${apiEndPoint}`, { params });
  }
  post(apiEndPoint: string, body: any) {
    return this.http.post(`${this.BASE_URL}${apiEndPoint}`, body);
  }
  put(apiEndPoint: string, body: any) {
    return this.http.put(`${this.BASE_URL}${apiEndPoint}`, body);
  }
  delete(apiEndPoint: string) {
    return this.http.delete(`${this.BASE_URL}${apiEndPoint}`);
  }



  getWithParams(apiEndPoint: string, params: any) {
    return this.http.get(`${this.BASE_URL}${apiEndPoint}`, { params });
  }
  postWithParams(apiEndPoint: string, body: any, params: any) {
    return this.http.post(`${this.BASE_URL}${apiEndPoint}`, body, { params });
  }
  putWithParams(apiEndPoint: string, body: any, params: any) {
    return this.http.put(`${this.BASE_URL}${apiEndPoint}`, body, { params });
  }
  deleteWithParams(apiEndPoint: string, params: any) {
    return this.http.delete(`${this.BASE_URL}${apiEndPoint}`, { params });
  }

  getWithHeader(apiEndPoint: string, params: any) {
    return this.http.get(`${this.BASE_URL}${apiEndPoint}`, { ...this.getHeader(), params });
  }
  postWithHeader(apiEndPoint: string, body: any) {
    return this.http.post(`${this.BASE_URL}${apiEndPoint}`, body, this.getHeader());
  }
  putWithHeader(apiEndPoint: string, body: any) {
    return this.http.put(`${this.BASE_URL}${apiEndPoint}`, body, this.getHeader());
  }
  deleteWithHeader(apiEndPoint: string) {
    return this.http.delete(`${this.BASE_URL}${apiEndPoint}`, this.getHeader());
  }


}
