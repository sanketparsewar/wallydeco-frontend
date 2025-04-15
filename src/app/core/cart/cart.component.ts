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
  orderObj: any = {
    deliveryCharges: 200,
  };
  loggedUser: any = null;

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
    // this.isLoaded = true;
    // setTimeout(() => {
    //   this.isLoaded = false;
    // }, 1000);

    this.cartItemsLength$.pipe(take(1)).subscribe((length: number) => {
      if (length === 0) {
        const storedItems = JSON.parse(
          localStorage.getItem('cartItems') || '[]'
        );
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
  }

  getLoggedUser() {
    this.authService.loggedUser$
      .pipe(
        tap((user: any) => {
          if (!user) {
            this.router.navigateByUrl('/auth/login');
          }
        }),
        filter(user => !!user)
      )
      .subscribe((user: any) => {
        this.loggedUser = user;
        console.log(user);
      });
  }

  removeItem(itemId: string) {
    this.store.dispatch(removeItem({ itemId }));
    // localStorage.removeItem('cartItems');
    // this.cartItems$.subscribe((items: any) => {
    //   localStorage.setItem('cartItems', JSON.stringify(items));
    // });

  }

  updateQuantity(item: any, itemId: string, quantity: number) {
    this.store.dispatch(updateItemQuantity({ itemId, quantity }));
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

  applyCoupon() {

  }



  checkout() {
    console.log(this.cartItems);
  }

  back() {
    history.back();
  }
}
