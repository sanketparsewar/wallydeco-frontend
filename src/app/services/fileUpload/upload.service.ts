import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  private API_URL = 'http://localhost:8000/api';
  constructor(private http: HttpClient) {

  }

  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file); // The field name "file" must match upload.single("file")
    return this.http.post<any>(`${this.API_URL}/upload`, formData);
  }
  
}
