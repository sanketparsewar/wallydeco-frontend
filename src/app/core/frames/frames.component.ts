import { AlertService } from './../../services/alert/alert.service';
import { Component, OnInit } from '@angular/core';
import { WallpaperService } from '../../services/wallpaper/wallpaper.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from '../../component/loader/loader.component';
import { FooterComponent } from '../../component/footer/footer.component';
import { 
  trigger,
  transition,
  style,
  animate,
  stagger,
  query
} from '@angular/animations';
@Component({
  selector: 'app-frames',
  imports: [CommonModule,FormsModule,LoaderComponent,FooterComponent],
  templateUrl: './frames.component.html',
  styleUrl: './frames.component.css',
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
export class FramesComponent implements OnInit {
  framesList: any;
  isLoaded: boolean = false;
  category: string = 'frames';
  favouriteIds: string[] = [];

  constructor(private wallpaperService: WallpaperService,private router:Router,private alertService:AlertService) {
     this.generateAbstractFrameCollection();
   }

  ngOnInit(): void {
  }


  generateAbstractFrameCollection() {
    this.isLoaded = true;

    // Get trending wallpapers
    this.wallpaperService.getWallpaperByCategory(this.category).subscribe({
      next: (data: any) => {
        this.framesList = data;

        // Now get user's favourites
        this.wallpaperService.getFavouriteWallpapers().subscribe({
          next: (favRes: any) => {
            this.favouriteIds = favRes.favourites.map((fav: any) => fav._id);

            // Mark wallpapers as favourite
            this.framesList.forEach((item:any) => {
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
        this.router.navigate(['auth','login'])
      },
    });
  }

  openFrame(wallpaperId: string) {
    this.router.navigate(['/wallpaper', wallpaperId]);
  }

}
