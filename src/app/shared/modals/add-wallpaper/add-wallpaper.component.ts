import { AlertService } from './../../../services/alert/alert.service';
import { WallpaperService } from './../../../services/wallpaper/wallpaper.service';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UploadService } from '../../../services/fileUpload/upload.service';
import { CategoryService } from '../../../services/category/category.service';
import { DashboardService } from '../../../services/dashboard/dashboard.service';
declare var bootstrap: any; // for Bootstrap 5 modal

@Component({
  selector: 'app-add-wallpaper',
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './add-wallpaper.component.html',
  styleUrl: './add-wallpaper.component.css',
})
export class AddWallpaperComponent {
  @Output() getAllWallpapers = new EventEmitter();
  @Input() wallpaperData!: any;
  @ViewChild('addWallpaperModal') modalRef!: ElementRef;
  availableColors: string[] = ['Red', 'Blue', 'Green', 'Black', 'White'];
  categories = [];
  imagePreview: string = '';
  selectedFile: File | null = null;
  imageUrl: string = '';
  isFileUploading: boolean = false

  wallpaper = {
    wallpaperId: '',
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
    private alertService: AlertService,
    private categoryService: CategoryService,
    private dashboardService: DashboardService
  ) {
    this.categoryService.categories$.subscribe((data: any) => {
      this.categories = data.map((cat: any) => cat.name);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['wallpaperData']) {
      if (this.wallpaperData) {
        this.wallpaper = { ...this.wallpaperData };
      } else {
        this.resetForm();
      }
    }
  }

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
    this.isFileUploading = true
    if (!this.selectedFile) {
      console.error('No file selected');
      this.isFileUploading = false
      return;
    }
    if(!this.wallpaper.category) {
      this.alertService.showError('Select category first');
      this.isFileUploading = false
      return 
    }
    this.uploadService
      .uploadFile(this.selectedFile, `wallydeco/${this.wallpaper.category}`)
      .subscribe({
        next: (res: any) => {
          if (res.file && res.file.url) {
            this.wallpaper.images.push(res.file.url);
            this.alertService.showSuccess('File uploaded successfully.')
            this.selectedFile = null;
            this.isFileUploading = false

          } else {
            this.isFileUploading = false
            this.alertService.showError('Invalid response structure.');
          }
        },
        error: (error: any) => {
          this.isFileUploading = false
          this.alertService.showError(error.error.message);
        },
      });
  }

  // Add wallpaper after file upload
  onAddWallpaper() {
    this.wallpaperService.addWallpaper(this.wallpaper).subscribe({
      next: (res: any) => {
        this.alertService.showSuccess('Wallpaper added successfully!');
        this.getAllWallpapers.emit();
        this.resetForm();
        this.closeModal();
      },
      error: (error: any) => {
        this.alertService.showError(error.error.message);
      },
    });
  }


  onUpdate() {
    this.wallpaperService.updateWallpaper(this.wallpaperData._id, this.wallpaper).subscribe({
      next: (data: any) => {
        this.getAllWallpapers.emit();
        this.resetForm();
        this.closeModal();
        this.dashboardService.getDashboardData().subscribe();
        // this.isLoaded = false;
      },
      error: (error) => {
        // this.isLoaded = false;
        console.log(error.error.message);
      }
    });
  }


  closeModal() {
    if (this.wallpaperData) this.resetForm();
    const modalElement = this.modalRef.nativeElement;
    const modalInstance = bootstrap.Modal.getInstance(modalElement)
    modalInstance.hide();
  }

  resetForm() {
    this.wallpaper = {
      wallpaperId: '',
      title: '',
      description: '',
      price: null,
      category: '',
      size: '',
      stock: null,
      colorOptions: [] as string[],
      images: [] as string[],
    };
    this.selectedFile = null;

  }


}
