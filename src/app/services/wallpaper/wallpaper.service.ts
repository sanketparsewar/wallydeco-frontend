import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class WallpaperService {
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
  getFavouriteWallpapers(): Observable<any> {
    return this.http.get<any>(
      `${this.BASE_URL}/wallpaper/favourite`,this.getHeader()
    );
  }
  addWallpaperToFavourite(id:string): Observable<any> {
    return this.http.get<any>(
      `${this.BASE_URL}/wallpaper/favourite/${id}`,this.getHeader()
    );
  }

  createWallpaper(wallpaper: any): Observable<any> {
    return this.http.post<any>(`${this.BASE_URL}/wallpaper`, wallpaper, this.getHeader());
  }

  updateWallpaper(id: string, wallpaper: any): Observable<any> {
    return this.http.put<any>(`${this.BASE_URL}/wallpaper/${id}`, wallpaper,this.getHeader());
  }
  deleteWallpaper(id: string): Observable<any> {
    return this.http.delete<any>(`${this.BASE_URL}/wallpaper/${id}`, this.getHeader());
  }
}
