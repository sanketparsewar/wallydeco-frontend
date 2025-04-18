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
import { UserService } from '../../services/user/user.service';
@Component({
  selector: 'app-cart',
  imports: [FooterComponent, CommonModule, LoaderComponent, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  cartItems: IcartItem[] = [];
  loggedUser: any = null;
  couponError: string = '';
  appliedCoupon: any = null;
  inputCoupon: string = '';
  amountObj: any = {
    totalAmount: 0,
    deliveryFee: 200,
    discount: 0,
    finalTotal: 0,
    couponCode: ''
  }

  store = inject(Store);
  router = inject(Router);
  cartItems$: Observable<IcartItem[]> = this.store.select(selectCartItems);
  cartTotal$: Observable<number> = this.store.select(selectCartTotal);
  isLoaded: boolean = false;
  constructor(
    private confirmService: ConfirmService,
    private alertService: AlertService,
    private couponService: CouponService,
    private authService: AuthService,
    private userService:UserService
  ) {

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
    this.getLoggedUser()

    this.getCartTotal()
  }


  getCartTotal() {
    this.cartTotal$.subscribe((total) => {
      this.calculateFinalTotal(total);
    });
  }


  getLoggedUser() {
    this.isLoaded = true
    this.authService.loggedUser$
      .pipe(
        tap((user: any) => {
          if (!user) {
            this.isLoaded = false
          }
        }),
        filter(user => !!user)
      )
      .subscribe((user: any) => {
        this.loggedUser = user;
        this.isLoaded = false;
      });

  }

  removeItem(itemId: string) {
    this.store.dispatch(removeItem({ itemId }));
    this.getCartTotal()

    if (this.amountObj.couponCode) {
      this.applyCoupon()
    }
  }


  clearCart() {
    this.confirmService.showConfirm('clear your bag').then((confirmed: any) => {
      if (confirmed) {
        this.store.dispatch(clearCart());
        localStorage.removeItem('cartItems');
        localStorage.removeItem('amountObj');
        this.alertService.showSuccess('Bag Cleared.');
      }
    });
  }

  openWallpaper(wallpaperId: string) {
    this.router.navigate(['/wallpaper', wallpaperId]);
  }


  updateQuantity(item: any, itemId: string, quantity: number) {
    this.store.dispatch(updateItemQuantity({ itemId, quantity }));
    if (this.inputCoupon) {
      this.applyCoupon()
    }
  }


  calculateFinalTotal(cartTotal: number) {
    this.amountObj.totalAmount = cartTotal
    this.amountObj.discount = this.appliedCoupon ? this.appliedCoupon.discount : 0;
    this.amountObj.finalTotal = this.amountObj.totalAmount + this.amountObj.deliveryFee - this.amountObj.discount;
  }


  removeCoupon() {
    this.amountObj.couponCode = '';
    this.amountObj.discount = 0
    this.inputCoupon = ''
    this.appliedCoupon = null;

    this.getCartTotal()

  }

  applyCoupon() {
    this.couponError = '';
    this.appliedCoupon = null;

    this.amountObj.couponCode = this.inputCoupon.toUpperCase()
    if (!this.amountObj.couponCode.trim()) {
      this.couponError = 'Please enter a coupon code.';
      return;
    }

    this.amountObj.discount = 0
    this.couponService.applyCoupon(this.loggedUser._id, this.amountObj.couponCode).subscribe({
      next: (res: any) => {
        this.cartTotal$.pipe(take(1)).subscribe((total) => {
          if (total < res.coupon.minAmount) {
            this.couponError = `Order must be above ${res.coupon.minAmount} to use '${this.amountObj.couponCode}' coupon.`;
            this.amountObj.couponCode = '';
            // this.amountObj.discount = 0
            this.calculateFinalTotal(total);

            return;
          }
          this.appliedCoupon = res.coupon;
          this.calculateFinalTotal(total);
        });
      },
      error: (error: any) => {
        this.amountObj.couponCode = '';
        this.couponError = error.error.message;
      }
    });
  }


  checkout() {
    this.cartItems$.subscribe({
      next: (data: any) => {
        this.cartItems = data
      }
    })
    localStorage.setItem('amountObj', JSON.stringify(this.amountObj))
    this.router.navigate(['/cart/checkout'])
  }


  back() {
    history.back();
  }
}
