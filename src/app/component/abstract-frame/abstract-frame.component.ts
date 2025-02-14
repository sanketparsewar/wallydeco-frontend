import { Component } from '@angular/core';
import { WallpaperService } from '../../services/wallpaper/wallpaper.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-abstract-frame',
  imports: [CommonModule, FormsModule],
  templateUrl: './abstract-frame.component.html',
  styleUrl: './abstract-frame.component.css',
})
export class AbstractFrameComponent {
  framesList: any;
  isLoaded: boolean = false;
  category: string = 'abstract-frames';

  constructor(
    private wallpaperService: WallpaperService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.generateAbstractFrameCollection();
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
  openFrame(wallpaperId: string) {
    this.router.navigate(['/wallpaper', wallpaperId]);
  }
}
