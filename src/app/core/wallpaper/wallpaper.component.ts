import { AlertService } from './../../services/alert/alert.service';
import { WallpaperService } from './../../services/wallpaper/wallpaper.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { LoaderComponent } from '../../component/loader/loader.component';
import { FooterComponent } from '../../component/footer/footer.component';

@Component({
  selector: 'app-wallpaper',
  imports: [CurrencyPipe, CommonModule, LoaderComponent,FooterComponent],
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
    private wallpaperService: WallpaperService,
    private alertService: AlertService
  ) {}
  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      if (params['wallpaperId']) {
        this.getWallpaper(params['wallpaperId']);
      }
    });
  }

  onChangeMainImage(image: string) {
    this.mainImage = image;
  }

  getWallpaper(wallpaperId: string) {
    this.isLoaded = true;
    this.wallpaperService.getWallpaperById(wallpaperId).subscribe({
      next: (data: any) => {
        this.wallpaperData = data;
        this.isLoaded = false;
      },
      error: (error) => {
        this.alertService.showError(error.error.message);
        this.isLoaded = false;
      },
    });
  }

  sendWhatsAppMessage() {
    const message = `Dear Team, 
I would like to place an order for a wallpaper. Below are the details: 

🖼 Wallpaper Name: ${this.wallpaperData.title}  
📂 Category: ${this.wallpaperData.category}  
🎨 Color: ${this.wallpaperData.colorOptions}  
📝 Description: ${this.wallpaperData.description}  
💰 Price: ₹${this.wallpaperData.price}  
📏 Size: ${this.wallpaperData.size}  

Kindly confirm availability and share the ordering process. Looking forward to your response.  `;

    const encodedMessage = encodeURIComponent(message);

    const whatsappURL = `https://wa.me/917021018644?text=${encodedMessage}`;

    window.open(whatsappURL, '_blank');
  }

  back() {
    history.back();
  }
}
