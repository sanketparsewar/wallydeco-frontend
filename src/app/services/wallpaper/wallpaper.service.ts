import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class WallpaperService {
  private BASE_URL: string;
  constructor(private http: HttpClient, private apiService: ApiService) {
    // this.BASE_URL = apiService.getBaseUrl();
    this.BASE_URL = environment.apiUrl;
  }

  getWallpapers(filters: any = {}): Observable<any> {
    let params = new HttpParams();
    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        params = params.set(key, filters[key]);
      }
    });
    return this.http.get<any>(`${this.BASE_URL}/wallpaper`, { params });
  }

  getWallpaperById(id: string): Observable<any> {
    return this.http.get<any>(`${this.BASE_URL}/wallpaper/${id}`);
  }
  getWallpaperByCategory(category: string): Observable<any> {
    return this.http.get<any>(
      `${this.BASE_URL}/wallpaper/category/${category}`
    );
  }

  createWallpaper(wallpaper: any): Observable<any> {
    return this.http.post<any>(`${this.BASE_URL}/wallpaper`, wallpaper, {
      withCredentials: true, // Allow cookies to be sent and received
    });
  }
  updateWallpaper(id: string, wallpaper: any): Observable<any> {
    return this.http.put<any>(`${this.BASE_URL}/wallpaper/${id}`, wallpaper, {
      withCredentials: true, // Allow cookies to be sent and received
    });
  }
  deleteWallpaper(id: string): Observable<any> {
    return this.http.delete<any>(`${this.BASE_URL}/wallpaper/${id}`, {
      withCredentials: true, // Allow cookies to be sent and received
    });
  }
}
