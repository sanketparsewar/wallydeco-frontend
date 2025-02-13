import { WallpaperService } from './../../../services/wallpaper/wallpaper.service';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UploadService } from '../../../services/fileUpload/upload.service';

@Component({
  selector: 'app-add-wallpaper',
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './add-wallpaper.component.html',
  styleUrl: './add-wallpaper.component.css',
})
export class AddWallpaperComponent {
  @Output() getAllWallpapers = new EventEmitter();
  availableColors: string[] = ['Red', 'Blue', 'Green', 'Black', 'White'];
  category: string[] = [
    'floral-pushpa',
    'trending',
    'top-picked',
    'frames',
    'abstract-frames',
  ];
  imagePreview: string = '';
  selectedFile: File | null = null;
  imageUrl: string = '';

  wallpaper = {
    title: '',
    description: '',
    price: null,
    category: '',
    size: '',
    stock: null,
    colorOptions: [] as string[],
    images: [] as string[],
  };

  constructor(
    private wallpaperService: WallpaperService,
    private uploadService: UploadService
  ) {}

  onColorChange(event: any, selectedcolorOptions: string) {
    if (event.target.checked) {
      this.wallpaper.colorOptions.push(selectedcolorOptions); // Add category if checked
    } else {
      this.wallpaper.colorOptions = this.wallpaper.colorOptions.filter(
        (cat) => cat !== selectedcolorOptions
      );
    }
  }

  // Handle file selection
  onFileSelected(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0]; // Select the first file
    }
  }

  // Upload wallpaper
  uploadWallpaper() {
    if (!this.selectedFile) {
      console.error('No file selected');
      return;
    }
    this.uploadService
      .uploadFile(this.selectedFile, `wallydeco/${this.wallpaper.category}`)
      .subscribe({
        next: (res: any) => {
          if (res.file && res.file.url) {
            this.wallpaper.images.push(res.file.url);
            console.log('File uploaded successfully:', res.file.url);
            this.selectedFile = null;
          } else {
            console.error('Invalid response structure:', res);
          }
        },
        error: (error: any) => {
          console.error('File upload failed:', error);
        },
      });
  }

  // Add wallpaper after file upload
  onAddWallpaper() {
    this.wallpaperService.createWallpaper(this.wallpaper).subscribe({
      next: (res: any) => {
        console.log('Wallpaper added successfully:', res);
        this.getAllWallpapers.emit();
      },
      error: (error: any) => {
        console.error('Wallpaper addition failed:', error);
        alert('Wallpaper addition failed!');
      },
    });
  }

  // Submit the form
  onSubmit() {
    this.onAddWallpaper();
  }
}
