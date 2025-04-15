import { CouponService } from './../../services/coupon/coupon.service';
import { AlertService } from './../../services/alert/alert.service';
import { Component, inject, OnInit } from '@angular/core';
import { FooterComponent } from '../../component/footer/footer.component';
import { CommonModule } from '@angular/common';
import { filter, map, Observable, take, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { IcartItem } from '../../shared/store/cart.state';
import {
  selectCartItems,
  selectCartTotal,
} from '../../shared/store/cart.selectors';
import {
  addItem,
  clearCart,
  removeItem,
  updateItemQuantity,
} from '../../shared/store/cart.actions';
import { Router } from '@angular/router';
import { LoaderComponent } from '../../component/loader/loader.component';
import { ConfirmService } from '../../services/confirm/confirm.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
@Component({
  selector: 'app-cart',
  imports: [FooterComponent, CommonModule, LoaderComponent, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  cartItems: IcartItem[] = [];
  deliveryCharges:number= 200;
  loggedUser: any = null;

  couponError: string = '';
  appliedCoupon: any = null;
  finalTotal: number = 0;
  discount:number=0
  cartTotal:number=0



  store = inject(Store);
  router = inject(Router);
  cartItems$: Observable<IcartItem[]> = this.store.select(selectCartItems);
  cartTotal$: Observable<number> = this.store.select(selectCartTotal);
  isLoaded: boolean = false;
  couponCode: string = ''
  constructor(
    private confirmService: ConfirmService,
    private alertService: AlertService,
    private couponService: CouponService,
    private authService: AuthService,
  ) {
    this.getLoggedUser()

  }

  get cartItemsLength$(): Observable<number> {
    return this.cartItems$.pipe(map((items) => items.length));
  }
  ngOnInit() {
    this.cartItemsLength$.pipe(take(1)).subscribe((length: number) => {
      if (length === 0) {
        const storedItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
        if (storedItems.length > 0) {
          storedItems.forEach((item: any) => {
            this.store.dispatch(addItem({ item }));
          });
        }
      }
    });
  
    this.cartItemsLength$.subscribe((length: number) => {
      if (length !== 0) {
        this.cartItems$.subscribe((items: any) => {
          localStorage.setItem('cartItems', JSON.stringify(items));
        });
      } else {
        localStorage.removeItem('cartItems');
      }
    });
  
    this.cartTotal$.subscribe((total) => {
      this.calculateFinalTotal(total);
    });
  }

  calculateFinalTotal(cartTotal: number) {
    this.cartTotal=cartTotal
    this.discount = this.appliedCoupon ? this.appliedCoupon.discount : 0;
    this.finalTotal = cartTotal + this.deliveryCharges - this.discount;
    localStorage.setItem('discount',JSON.stringify(this.discount))
    localStorage.setItem('deliveryCharges',JSON.stringify(this.deliveryCharges))
    localStorage.setItem('cartTotal',JSON.stringify(this.cartTotal))
    localStorage.setItem('finalTotal',JSON.stringify(this.finalTotal))
  }
  

  getLoggedUser() {
    this.authService.loggedUser$
      .pipe(
        tap((user: any) => {
          // if (!user) {
          //   this.router.navigateByUrl('/auth/login');
          // }
        }),
        filter(user => !!user)
      )
      .subscribe((user: any) => {
        this.loggedUser = user;
      });
  }

  removeItem(itemId: string) {
    this.store.dispatch(removeItem({ itemId }));
  }

  updateQuantity(item: any, itemId: string, quantity: number) {
    this.store.dispatch(updateItemQuantity({ itemId, quantity }));
    if(this.couponCode) {
      this.applyCoupon()
    }
  }

  clearCart() {
    this.confirmService.showConfirm('clear your bag').then((confirmed: any) => {
      if (confirmed) {
        this.store.dispatch(clearCart());
        this.alertService.showSuccess('Bag Cleared.');
      }
    });
  }

  openWallpaper(wallpaperId: string) {
    this.router.navigate(['/wallpaper', wallpaperId]);
  }

  removeCoupon(){
    this.couponCode = '';
    this.appliedCoupon = null;
  }

  applyCoupon() {
    this.couponError = '';
    this.appliedCoupon = null;
  
    if (!this.couponCode.trim()) {
      this.couponError = 'Please enter a coupon code.';
      return;
    }
    
    this.couponService.applyCoupon(this.loggedUser._id,this.couponCode).subscribe({
      next: (res: any) => {
        this.cartTotal$.pipe(take(1)).subscribe((total) => {
          if (total < 999) {
            this.couponError = 'Order must be above ₹999 to use this coupon.';
            return;
          }
  
          this.appliedCoupon = res.coupon;
          this.calculateFinalTotal(total);
        });
      },
      error: () => {
        this.couponError = 'Invalid Coupon Code!';
      }
    });
  }
  


  checkout() {
    this.cartItems$.subscribe({
      next: (data: any) => {
        this.cartItems=data
      }
    })
    console.log(this.cartItems);
    
    console.log('cartTotal',this.cartTotal)
    console.log('deliveryCharges',this.deliveryCharges)
    console.log('discount',this.discount)
    console.log('finalTotal',this.finalTotal)
    this.router.navigate(['/cart/checkout'])
  }

  back() {
    history.back();
  }
}
