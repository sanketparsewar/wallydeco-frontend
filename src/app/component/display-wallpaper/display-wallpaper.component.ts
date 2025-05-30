import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { WallpaperService } from '../../services/wallpaper/wallpaper.service';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert/alert.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-display-wallpaper',
  templateUrl: './display-wallpaper.component.html',
  imports: [FormsModule, CommonModule, LoaderComponent],
  styleUrls: ['./display-wallpaper.component.css'],
  animations: [
    trigger('listAnimation', [  // Changed from 'fadeInStagger' to 'listAnimation'
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger('100ms', [
            animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class DisplayWallpaperComponent implements OnInit {
  wallpaperList: any[] = [];
  @Input() category: string = '';
  favouriteIds: string[] = [];
  isLoaded: boolean = false;
  constructor(private wallpaperService: WallpaperService, private router: Router, private alertService: AlertService) { }

  ngOnInit() {
    this.generateCollection()
  }


  generateCollection() {
    this.isLoaded = true;

    // Get trending wallpapers
    this.wallpaperService.getWallpaperByCategory(this.category).subscribe({
      next: (data: any) => {
        this.wallpaperList = data;
        // Now get user's favourites
        this.wallpaperService.getFavouriteWallpapers().subscribe({
          next: (favRes: any) => {
            this.favouriteIds = favRes.favourites.map((fav: any) => fav._id);
            // Mark wallpapers as favourite
            this.wallpaperList.forEach((item) => {
              item.isFavourite = this.favouriteIds.includes(item._id);
            });
            this.isLoaded = false;
          },
          error: () => {
            this.isLoaded = false;
          }
        });
      },
      error: (error) => {
        this.alertService.showError(error.error.message);
        this.isLoaded = false;
      },
    });
  }


  toggleFavorite(item: any) {
    item.isFavourite = !item.isFavourite;

    this.wallpaperService.addWallpaperToFavourite(item._id).subscribe({
      next: () => {
        // Successfully toggled
      },
      error: (error) => {
        this.alertService.showWarning('Login required');
        this.router.navigate(['auth', 'login'])
      },
    });
  }

  openWallpaper(id: string) {
    this.router.navigate(['/wallpaper', id]);
  }


}
