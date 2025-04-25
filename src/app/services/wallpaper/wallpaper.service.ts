import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../http/http.service';


@Injectable({
  providedIn: 'root',
})
export class WallpaperService {
  constructor(private httpService: HttpService) { }

  getWallpaperById(id: string): Observable<any> {
    return this.httpService.get(`/wallpaper/${id}`);
  }

  getWallpapers(filters: any = {}): Observable<any> {
    let params = new HttpParams();
    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        params = params.set(key, filters[key]);
      }
    });
    return this.httpService.getWithParams('/wallpaper', params);
  }


  getFavouriteWallpapers(): Observable<any> {
    return this.httpService.secureGet('/wallpaper/favourites');
   
  }

  getWallpaperByCategory(category: string): Observable<any> {
    return this.httpService.get(`/wallpaper/category/${category}`);
   
  }

  addWallpaperToFavourite(id: string): Observable<any> {
    return this.httpService.secureGet(`/wallpaper/favourite/${id}`);
    
  }

  addWallpaper(wallpaper: any): Observable<any> {
    return this.httpService.securePost('/wallpaper', wallpaper);
  }

  updateWallpaper(id: string, wallpaper: any): Observable<any> {
    return this.httpService.securePut(`/wallpaper/${id}`, wallpaper);
  }
  
  deleteWallpaper(id: string): Observable<any> {
    return this.httpService.secureDelete(`/wallpaper/${id}`);
  }
}
