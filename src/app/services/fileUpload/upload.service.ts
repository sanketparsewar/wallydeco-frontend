import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  constructor(private httpService: HttpService) { }


  uploadFile(file: File, folder: string): Observable<any> {
    const formData = new FormData();
    formData.append("file", file); // The field name "file" must match upload.single("file")
    formData.append("folder", folder); // Append the folder field
    return this.httpService.post('/upload', formData);
    // return this.http.post<any>(`${this.BASE_URL}/upload`, formData);
  }
}
