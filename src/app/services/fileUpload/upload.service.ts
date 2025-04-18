import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  private BASE_URL: string;
    constructor(private http: HttpClient) {
      this.BASE_URL = environment.apiUrl;
    }

    uploadFile(file: File, folder: string): Observable<any> {
      const formData = new FormData();
      formData.append("file", file); // The field name "file" must match upload.single("file")
      formData.append("folder", folder); // Append the folder field
    
      return this.http.post<any>(`${this.BASE_URL}/upload`, formData);
    }
}
