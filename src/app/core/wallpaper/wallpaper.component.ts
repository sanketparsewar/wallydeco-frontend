import { AlertService } from './../../services/alert/alert.service';
import { WallpaperService } from './../../services/wallpaper/wallpaper.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { LoaderComponent } from '../../component/loader/loader.component';
import { FooterComponent } from '../../component/footer/footer.component';
// import { IcartItem } from '../../shared/models/cart.interface';
// import { Store } from '@ngrx/store';
// import { addItem, addToCart } from '../../shared/store/cart.actions';
import { Observable } from 'rxjs';
import { selectCartItems } from '../../shared/store/cart.selectors';
import { IcartItem } from '../../shared/store/cart.state';
import { Store } from '@ngrx/store';
import { addItem } from '../../shared/store/cart.actions';

@Component({
  selector: 'app-wallpaper',
  imports: [CurrencyPipe, CommonModule, LoaderComponent, FooterComponent],
  templateUrl: './wallpaper.component.html',
  styleUrl: './wallpaper.component.css',
})
export class WallpaperComponent implements OnInit {
  wallpaperData: any;
  mainImage: string = '';
  isLoaded: boolean = false;
  selectedColor: any;

  store = inject(Store);
  cartItems$: Observable<IcartItem[]> = this.store.select(selectCartItems);

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
  selectColor(event: any) {
    this.selectedColor = event.target.value;
  }

  // addToCart() {
  //   this.cartService.addToCart({
  //     id: this.wallpaperData._id,
  //     title: this.wallpaperData.title,
  //     image: this.wallpaperData.images[0],
  //     category: this.wallpaperData.category,
  //     stock: this.wallpaperData.stock,
  //     size: this.wallpaperData.size,
  //     color: this.selectedColor,
  //     price: this.wallpaperData.price,
  //     quantity: 1,
  //     totalPrice: this.wallpaperData.price,
  //   });
  //   this.alertService.showSuccess('Wallpaper added to cart successfully!');
  //   this.router.navigateByUrl('/cart');
  // }
  // addToCart(item: IcartItem) {
  //   this.store.dispatch(addToCart({ item }));
  //   console.log('added',item)
  // }

  addToCart(productObj: any) {
    const cartItem: IcartItem = {
      id: productObj._id,
      title: this.wallpaperData.title,
      price: this.wallpaperData.price,
      image: this.wallpaperData.images[0],
      category: this.wallpaperData.category,
      stock: this.wallpaperData.stock,
      size: this.wallpaperData.size,
      color: this.selectedColor,
      quantity: 1, // Default to quantity 1
    };
    this.store.dispatch(addItem({ item: cartItem }));
    this.alertService.showSuccess('Added to cart!');
  }

  openCart() {
    this.router.navigateByUrl('/cart');
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
