import { AlertService } from './../../services/alert/alert.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WallpaperService } from '../../services/wallpaper/wallpaper.service';
import { Router } from '@angular/router';
import { LoaderComponent } from '../../component/loader/loader.component';
import { FooterComponent } from '../../component/footer/footer.component';

@Component({
  selector: 'app-trending',
  imports: [FormsModule, CommonModule, LoaderComponent,FooterComponent],
  templateUrl: './trending.component.html',
  styleUrl: './trending.component.css',
})
export class TrendingComponent implements OnInit {
  wallpaperList: any;
  isLoaded: boolean = false;

  category: string = 'trending';
  constructor(
    private wallpaperService: WallpaperService,
    private router: Router,
    private alertService: AlertService
  ) {
    this.generateTrendingCollection();
  }

  ngOnInit() {
    // this.generateFloralCollection();
  }
  toggleFavorite(event: Event, item: any) {
    const target = event.target as HTMLElement;
    target.classList.toggle('text-danger'); // Toggle red color
    target.classList.toggle('fa-solid'); // Change icon to solid heart
    target.classList.toggle('fa-regular'); // Toggle back to regular heart
  }
  

  generateTrendingCollection() {
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
