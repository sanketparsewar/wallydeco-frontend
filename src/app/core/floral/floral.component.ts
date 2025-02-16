import { AlertService } from './../../services/alert/alert.service';
import { FormsModule } from '@angular/forms';
import { WallpaperService } from './../../services/wallpaper/wallpaper.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LoaderComponent } from '../../component/loader/loader.component';

@Component({
  selector: 'app-floral',
  imports: [FormsModule, CommonModule, LoaderComponent],
  templateUrl: './floral.component.html',
  styleUrl: './floral.component.css',
})
export class FloralComponent implements OnInit {
  wallpaperList: any;
  isLoaded: boolean = false;

  category: string = 'floral';
  constructor(
    private wallpaperService: WallpaperService,
    private router: Router,
    private alertService: AlertService  // Added AlertService for error handling
  ) {
    this.generateFloralCollection();
  }

  ngOnInit() {
    // this.generateFloralCollection();
  }

  generateFloralCollection() {
    this.isLoaded = true;
    this.wallpaperService.getWallpaperByCategory(this.category).subscribe({
      next: (data: any) => {
        this.wallpaperList = data;
        this.isLoaded = false;
      },
      error: (error) => {
        this.alertService.showError(error.error.message)
        this.isLoaded = false;
      },
    });
  }

  openWallpaper(wallpaperId: string) {
    this.router.navigate(['/wallpaper', wallpaperId]);
  }
}
