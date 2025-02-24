import { AlertService } from './../../services/alert/alert.service';
import { Component, OnInit } from '@angular/core';
import { WallpaperService } from '../../services/wallpaper/wallpaper.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from '../../component/loader/loader.component';
import { FooterComponent } from '../../component/footer/footer.component';

@Component({
  selector: 'app-frames',
  imports: [CommonModule,FormsModule,LoaderComponent,FooterComponent],
  templateUrl: './frames.component.html',
  styleUrl: './frames.component.css'
})
export class FramesComponent implements OnInit {
  framesList: any;
  isLoaded: boolean = false;
  category: string = 'frames';

  constructor(private wallpaperService: WallpaperService,private router:Router,private alertService:AlertService) {
     this.generateAbstractFrameCollection();
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
  openFrame(wallpaperId:string){
    this.router.navigate(['/wallpaper', wallpaperId]);
  }
}
