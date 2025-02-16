import { AlertService } from './../../services/alert/alert.service';
import { Component } from '@angular/core';
import { WallpaperService } from '../../services/wallpaper/wallpaper.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-top-picked-wallpapers',
  imports: [CommonModule, FormsModule,LoaderComponent],
  templateUrl: './top-picked-wallpapers.component.html',
  styleUrl: './top-picked-wallpapers.component.css',
})
export class TopPickedWallpapersComponent {
  wallpaperList: any;
  category: string = 'top-picked';
  isLoaded: boolean = false;
  constructor(
    private wallpaperService: WallpaperService,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.generateFloralCollection();
  }

  generateFloralCollection() {
    this.isLoaded = true;
    this.wallpaperService.getWallpaperByCategory(this.category).subscribe({
      next: (data: any) => {
        this.wallpaperList = data;
        this.isLoaded = false;
      },
      error: (error) => {
        this.alertService.showError(error.error.message);
        this.isLoaded = false;
      },
    });
  }

  openWallpaper(wallpaperId: string) {
    this.router.navigate(['/wallpaper', wallpaperId]);
  }
}
