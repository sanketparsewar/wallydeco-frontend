import { AlertService } from './../../../services/alert/alert.service';
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
    'floral',
    'trending',
    'top-picked',
    'frames',
    'abstract-frames',
    'scrollable'
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
    private uploadService: UploadService,
    private alertService:AlertService
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
            this.alertService.showSuccess('File uploaded successfully.')
            this.selectedFile = null;
          } else {
            this.alertService.showError('Invalid response structure.');
          }
        },
        error: (error: any) => {
          this.alertService.showError(error.error.message);
        },
      });
  }

  // Add wallpaper after file upload
  onAddWallpaper() {
    this.wallpaperService.createWallpaper(this.wallpaper).subscribe({
      next: (res: any) => {
        this.alertService.showSuccess('Wallpaper added successfully!');
        this.getAllWallpapers.emit();
      },
      error: (error: any) => {
        this.alertService.showError(error.error.message);
      },
    });
  }

  // Submit the form
  onSubmit() {
    this.onAddWallpaper();
  }
}
