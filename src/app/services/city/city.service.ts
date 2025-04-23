import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private citiesSubject = new BehaviorSubject<any>(null);
  public cities$ = this.citiesSubject.asObservable();

  constructor(private httpService: HttpService) { }

  addCity(city: any) {
    return this.httpService.securePost('/city', city);
  }

  getAllCities() {
    return this.httpService.get('/city').pipe(
      tap((response: any) => {
        this.citiesSubject.next(response.cities);
      })
    );
  }

  getCityById(id: string) {
    return this.httpService.get(`/city/${id}`);
  }
  updateCity(id: string, city: any) {
    return this.httpService.securePut(`/city/${id}`, city);
  }
  deleteCity(id: string) {
    return this.httpService.secureDelete(`/city/${id}`);
  }
  getCityByName(name: string) {
    return this.httpService.get(`/city/name/${name}`);
  }
  getCityByState(state: string) {
    return this.httpService.get(`/city/state/${state}`);
  }

}
