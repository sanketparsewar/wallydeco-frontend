import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categoriesSubject = new BehaviorSubject<any[]>([]);
  public categories$ = this.categoriesSubject.asObservable();

  constructor(private httpService: HttpService) { }

  createCategory(categoryData: any): Observable<any> {
    return this.httpService.post('/category', categoryData)
  }
  getAllCategories(): Observable<any> {
    return this.httpService.get('/category').pipe(
      tap((response: any) => {
        this.setAllCategories(response.categories);
      })
    )
  }
  getCategoryById(categoryId: string): Observable<any> {
    return this.httpService.get(`/category/${categoryId}`)
  }

  updateCategory(categoryId: string, categoryData: any): Observable<any> {
    return this.httpService.put(`/category/${categoryId}`, categoryData)
  }
  deleteCategory(categoryId: string): Observable<any> {
    return this.httpService.delete(`/category/${categoryId}`)
  }


  setAllCategories(categories: any) {
    this.categoriesSubject.next(categories);
  }


}
