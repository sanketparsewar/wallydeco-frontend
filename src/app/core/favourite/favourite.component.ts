import { Component } from '@angular/core';
import { WallpaperService } from '../../services/wallpaper/wallpaper.service';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert/alert.service';
import { LoaderComponent } from '../../component/loader/loader.component';
import { FooterComponent } from '../../component/footer/footer.component';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-favourite',
  imports: [LoaderComponent,FooterComponent,CurrencyPipe,FormsModule, CommonModule],
  templateUrl: './favourite.component.html',
  styleUrl: './favourite.component.css'
})
export class FavouriteComponent {
wallpaperList: any;
  isLoaded: boolean = false;
  constructor(
    private wallpaperService: WallpaperService,
    private router: Router,
    private alertService: AlertService
  ) {
    this.getFavouriteWallpapers();
  }

  ngOnInit() {
  }

  getFavouriteWallpapers() {
    this.isLoaded = true;
    this.wallpaperService.getFavouriteWallpapers().subscribe({
      next: (data: any) => {
        this.wallpaperList = data.favourites;
        this.isLoaded = false;
      },
      error: (error) => {
        this.alertService.showError(error.error.message);
        this.isLoaded = false;
      },
    });
  }
  removeFavourite(id:string){
    this.wallpaperService.addWallpaperToFavourite(id).subscribe({
      next: () => {
        this.getFavouriteWallpapers()
      },
      error: (error) => {
        this.alertService.showError(error.message); 
          }
    })
  }

  openWallpaper(wallpaperId: string) {
    this.router.navigate(['/wallpaper', wallpaperId]);
  }
}
