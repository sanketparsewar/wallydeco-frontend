// import { selectTotalPrice } from './../../shared/store/cart.selectors';
import { Component, inject, OnInit } from '@angular/core';
import { FooterComponent } from '../../component/footer/footer.component';
// import { Icart, IcartItem } from '../../shared/models/cart.interface';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { IcartItem } from '../../shared/store/cart.state';
import {
  selectCartItems,
  selectCartTotal,
} from '../../shared/store/cart.selectors';
import {
  clearCart,
  removeItem,
  updateItemQuantity,
} from '../../shared/store/cart.actions';
import { Router } from '@angular/router';
// import {
//   selectCartItems,
//   selectTotalPrice,
// } from '../../shared/store/cart.selectors';
// import {
//   decrementQuantity,
//   incrementQuantity,
//   removeFromCart,
// } from '../../shared/store/cart.actions';

@Component({
  selector: 'app-cart',
  imports: [FooterComponent, CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  cartItems: IcartItem[] = [];
  orderObj: any = {
    deliveryCharges: 200,
  };
  store = inject(Store);
  router=inject(Router)
  cartItems$: Observable<IcartItem[]> = this.store.select(selectCartItems);
  cartTotal$: Observable<number> = this.store.select(selectCartTotal);

  constructor() {}
  ngOnInit() {
  }
  
  removeItem(itemId: string) {
    this.store.dispatch(removeItem({ itemId }));
    localStorage.removeItem('cartItems');
    this.cartItems$.subscribe((items: any) => {
      localStorage.setItem('cartItems', JSON.stringify(items));
    });
  }

  updateQuantity(item: any, itemId: string, quantity: number) {
    this.store.dispatch(updateItemQuantity({ itemId, quantity }));
  }

  clearCart() {
    this.store.dispatch(clearCart());
  }

  openWallpaper(wallpaperId: string) {
    this.router.navigate(['/wallpaper', wallpaperId]);
  }
  checkout() {
    console.log(this.cartItems);
  }
}
