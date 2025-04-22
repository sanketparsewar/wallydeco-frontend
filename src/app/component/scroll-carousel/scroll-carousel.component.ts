import { Component, OnInit } from '@angular/core';
import { WallpaperService } from '../../services/wallpaper/wallpaper.service';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert/alert.service';

@Component({
  selector: 'app-scroll-carousel',
  imports: [],
  templateUrl: './scroll-carousel.component.html',
  styleUrl: './scroll-carousel.component.css'
})
export class ScrollCarouselComponent implements OnInit {
category:string='Scrollable'
 wallpaperList: any;
   isLoaded: boolean = false;
   constructor(
     private wallpaperService: WallpaperService,
     private router: Router,
     private alertService: AlertService 
   ) {}
 
   ngOnInit() {
    //  this.generateFloralCollection();
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
 
   openWallpaper(id: string) {
     this.router.navigate(['/wallpaper', id]);
   }
}
