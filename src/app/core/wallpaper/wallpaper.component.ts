import { AlertService } from './../../services/alert/alert.service';
import { WallpaperService } from './../../services/wallpaper/wallpaper.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { LoaderComponent } from '../../component/loader/loader.component';
import { FooterComponent } from '../../component/footer/footer.component';
import { Observable } from 'rxjs';
import { selectCartItems } from '../../shared/store/cart.selectors';
import { IcartItem } from '../../shared/store/cart.state';
import { Store } from '@ngrx/store';
import { addItem } from '../../shared/store/cart.actions';
import { FaqComponent } from '../../component/faq/faq.component';
import { CategoryService } from '../../services/category/category.service';

@Component({
  selector: 'app-wallpaper',
  imports: [CurrencyPipe, CommonModule, LoaderComponent, FooterComponent, FaqComponent],
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
  features: any[] = [
    { img: 'https://img.icons8.com/color/48/rgb-circle-1--v1.png', text: 'Shiny Colors' },
    { img: 'https://img.icons8.com/dotty/80/gloss-paper.png', text: 'Top Quality Material' },
    { img: 'https://img.icons8.com/external-vitaliy-gorbachev-lineal-vitaly-gorbachev/60/external-man-male-profession-vitaliy-gorbachev-lineal-vitaly-gorbachev-44.png', text: 'Professional Installation' },
    { img: 'https://img.icons8.com/ios/50/cleaning-a-surface.png', text: 'Easy to Clean' },
    { img: 'https://img.icons8.com/dotty/80/consultation.png', text: 'Expert Consultation' },
    { img: 'https://img.icons8.com/pastel-glyph/64/security-checked--v2.png', text: 'Damage Warranty' }
  ]
  wallpaperList: any[] = [];

  categories = []
  category: string = '';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private wallpaperService: WallpaperService,
    private alertService: AlertService,
    private categoryService: CategoryService,

  ) {
    this.categoryService.categories$.subscribe((data: any) => {
      this.categories = data.map((cat: any) => cat.name);
      this.category = this.categories[Math.floor(Math.random() * this.categories.length)];
      this.generateCollection()
    });
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.getWallpaper(params['id']);
      }
    });
  }


  generateCollection() {
    // Get trending wallpapers
    this.wallpaperService.getWallpaperByCategory(this.category).subscribe({
      next: (data: any) => {
        this.wallpaperList = data;
      },
      error: (error) => {
        this.alertService.showError(error.error.message);
      },
    });
  }


  openWallpaper(id: string) {
    this.router.navigate(['/wallpaper', id]);
  }


  onChangeMainImage(image: string) {
    this.mainImage = image;
  }

  getWallpaper(id: string) {
    this.isLoaded = true;
    this.wallpaperService.getWallpaperById(id).subscribe({
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

  addToCart(productObj: any) {
    const cartItem: IcartItem = {
      id: productObj._id,
      title: this.wallpaperData.title,
      price: this.wallpaperData.price,
      image: this.wallpaperData.images[0],
      category: this.wallpaperData.category,
      stock: this.wallpaperData.stock,
      size: this.wallpaperData.size,
      wallpaperId:this.wallpaperData.wallpaperId,
      color: this.selectedColor,
      quantity: 1, // Default to quantity 1
    };
    this.store.dispatch(addItem({ item: cartItem }));
    this.alertService.showSuccess('Added to Shopping bag!');
    this.cartItems$.subscribe(
      (items: any) => {
        localStorage.setItem('cartItems', JSON.stringify(items));
      }
    );
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
