import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WallpaperService } from '../../services/wallpaper/wallpaper.service';
import { Router } from '@angular/router';
import { LoaderComponent } from '../../component/loader/loader.component';

@Component({
  selector: 'app-trending',
  imports: [FormsModule, CommonModule, LoaderComponent],
  templateUrl: './trending.component.html',
  styleUrl: './trending.component.css',
})
export class TrendingComponent implements OnInit {
  wallpaperList: any;
  isLoaded: boolean = false;

  category: string = 'trending';
  constructor(
    private wallpaperService: WallpaperService,
    private router: Router
  ) {
    this.generateTrendingCollection();
  }

  ngOnInit() {
    // this.generateFloralCollection();
  }

  generateTrendingCollection() {
    this.isLoaded = true;

    this.wallpaperService.getWallpaperByCategory(this.category).subscribe({
      next: (data: any) => {
        this.wallpaperList = data;
        console.log(this.wallpaperList);
        this.isLoaded = false;
      },
      error: (error) => {
        console.error('Error fetching wallpapers:', error);
        this.isLoaded = false;
      },
    });
  }

  openWallpaper(wallpaperId: string) {
    this.router.navigate(['/wallpaper', wallpaperId]);
  }
}
