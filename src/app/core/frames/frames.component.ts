import { Component, OnInit } from '@angular/core';
import { WallpaperService } from '../../services/wallpaper/wallpaper.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from '../../component/loader/loader.component';

@Component({
  selector: 'app-frames',
  imports: [CommonModule,FormsModule,LoaderComponent],
  templateUrl: './frames.component.html',
  styleUrl: './frames.component.css'
})
export class FramesComponent implements OnInit {
  framesList: any;
  isLoaded: boolean = false;
  category: string = 'frames';

  constructor(private wallpaperService: WallpaperService,private router:Router) {
     this.generateAbstractFrameCollection();
   }

  ngOnInit(): void {
  }

  generateAbstractFrameCollection(): void {
    this.isLoaded = true;

    this.wallpaperService.getWallpaperByCategory(this.category).subscribe({
      next: (data: any) => {
        this.framesList = data;
        console.log(this.framesList);
        this.isLoaded = false;

      },
      error: (error) => {
        console.error('Error fetching wallpapers:', error);
        this.isLoaded = false;

      },
    });
  }
  openFrame(wallpaperId:string){
    this.router.navigate(['/wallpaper', wallpaperId]);
  }
}
