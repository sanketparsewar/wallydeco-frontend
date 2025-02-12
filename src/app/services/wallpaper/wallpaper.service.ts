import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WallpaperService {
  constructor(private http: HttpClient) {}
  private API_URL = 'http://localhost:8000/api/';

  getWallpapers(): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/wallpaper`,);
  }
  getWallpaperById(id: string): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/wallpaper/${id}`);
  }

  createWallpaper(wallpaper: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/wallpaper`, wallpaper,{
      withCredentials: true, // Allow cookies to be sent and received
    });
  }
  updateWallpaper(id: string, wallpaper: any): Observable<any> {
    return this.http.put<any>(`${this.API_URL}/wallpaper/${id}`, wallpaper,{
      withCredentials: true, // Allow cookies to be sent and received
    });
  }
  deleteWallpaper(id: string): Observable<any> {
    return this.http.delete<any>(`${this.API_URL}/wallpaper/${id}`,{
      withCredentials: true, // Allow cookies to be sent and received
    });
  }
}
