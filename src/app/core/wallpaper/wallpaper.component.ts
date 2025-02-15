import { WallpaperService } from './../../services/wallpaper/wallpaper.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { LoaderComponent } from '../../component/loader/loader.component';

@Component({
  selector: 'app-wallpaper',
  imports: [CurrencyPipe, CommonModule,LoaderComponent],
  templateUrl: './wallpaper.component.html',
  styleUrl: './wallpaper.component.css',
})
export class WallpaperComponent implements OnInit {
  wallpaperData: any;
  mainImage: string = '';
  isLoaded: boolean = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private wallpaperService: WallpaperService
  ) {
  }
  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      if (params['wallpaperId']) {
        console.log(params['wallpaperId']);
        this.getWallpaper(params['wallpaperId']);
      }
    });
  }

  onChangeMainImage(image: string) {
    this.mainImage = image;
  }

  getWallpaper(wallpaperId: string) {
    this.isLoaded=true
    this.wallpaperService.getWallpaperById(wallpaperId).subscribe({
      next: (data: any) => {
        this.wallpaperData = data;
        console.log(this.wallpaperData);
        this.isLoaded=false
      },
      error: (error) => {
        console.log(error);
        this.isLoaded=false
      },
    });
  }

  back() {
    history.back();
  }
}
