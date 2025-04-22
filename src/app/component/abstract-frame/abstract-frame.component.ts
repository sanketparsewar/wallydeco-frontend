import { AlertService } from './../../services/alert/alert.service';
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
  category: string = 'Abstract-frames';

  constructor(
    private wallpaperService: WallpaperService,
    private router: Router,
    private alertService:AlertService
  ) {
    // this.generateAbstractFrameCollection();

  }

  ngOnInit(): void {
  }

  generateAbstractFrameCollection(): void {
    this.isLoaded = true;

    this.wallpaperService.getWallpaperByCategory(this.category).subscribe({
      next: (data: any) => {
        this.framesList = data;
        this.isLoaded = false;
      },
      error: (error) => {
        this.alertService.showError(error.error.message)
        this.isLoaded = false;
      },
    });
  }
  openFrame(id: string) {
    this.router.navigate(['/wallpaper', id]);
  }
}
