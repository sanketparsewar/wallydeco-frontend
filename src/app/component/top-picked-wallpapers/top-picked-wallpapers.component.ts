import { Component } from '@angular/core';
import { WallpaperService } from '../../services/wallpaper/wallpaper.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-top-picked-wallpapers',
  imports: [CommonModule, FormsModule],
  templateUrl: './top-picked-wallpapers.component.html',
  styleUrl: './top-picked-wallpapers.component.css',
})
export class TopPickedWallpapersComponent {
  wallpaperList: any;
  category: string = 'top-picked';

  constructor(
    private wallpaperService: WallpaperService,
    private router: Router
  ) {}

  ngOnInit() {
    this.generateFloralCollection();
  }

  generateFloralCollection() {
    this.wallpaperService.getWallpaperByCategory(this.category).subscribe({
      next: (data: any) => {
        this.wallpaperList = data;
        console.log(this.wallpaperList);
      },
      error: (error) => {
        console.error('Error fetching wallpapers:', error);
      },
    });
  }

  openWallpaper(wallpaperId: string) {
    this.router.navigate(['/wallpaper', wallpaperId]);
  }
}
