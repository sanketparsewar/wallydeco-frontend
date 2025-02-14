import { WallpaperService } from './../../services/wallpaper/wallpaper.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-wallpaper',
  imports: [CurrencyPipe],
  templateUrl: './wallpaper.component.html',
  styleUrl: './wallpaper.component.css',
})
export class WallpaperComponent implements OnInit {
  wallpaperData: any;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private wallpaperService: WallpaperService
  ) {}
  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      if (params['wallpaperId']) {
        console.log(params['wallpaperId']);
        this.getWallpaper(params['wallpaperId']);
      }
    });
  }

  getWallpaper(wallpaperId: string) {
    this.wallpaperService.getWallpaperById(wallpaperId).subscribe({
      next: (data: any) => {
        this.wallpaperData = data;
        console.log(this.wallpaperData);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  back(){
    history.back();
  }
}
