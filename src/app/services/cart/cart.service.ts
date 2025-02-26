import { Injectable } from '@angular/core';
import { Icart, IcartItem } from '../../shared/models/cart.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: IcartItem[] = [];
  private cart: Icart = { items: [], totalQuantity: 0, totalPrice: 0 };

  private cartItemsSubject = new BehaviorSubject<IcartItem[]>([]);
  private cartSubject = new BehaviorSubject<Icart>(this.cart);

  cartItemsArray$ = this.cartItemsSubject.asObservable();
  cart$ = this.cartSubject.asObservable();

  constructor() {}

  addToCart(item: IcartItem) {
    const existingItem = this.cartItems.find((i) => i.id === item.id);
    if (existingItem) {
      existingItem.quantity++;
      existingItem.totalPrice = existingItem.price * existingItem.quantity;
    } else {
      this.cartItems.push({ ...item, totalPrice: item.price * item.quantity });
    }
    this.updateCart();
  }

  removeFromCart(itemId: string) {
    this.cartItems = this.cartItems.filter((item) => item.id !== itemId);
    this.updateCart();
  }

  addQuantity(itemId: string) {
    const item = this.cartItems.find((i) => i.id === itemId);
    if (item) {
      item.quantity++;
      item.totalPrice = item.price * item.quantity;
      this.updateCart();
    }
  }

  minusQuantity(itemId: string) {
    const item = this.cartItems.find((i) => i.id === itemId);
    if (item) {
      if (item.quantity > 1) {
        item.quantity--;
        item.totalPrice = item.price * item.quantity;
      } else {
        this.removeFromCart(itemId);
        return;
      }
      this.updateCart();
    }
  }

  clearCart() {
    this.cartItems = [];
    this.updateCart();
  }

  private updateCart() {
    const totalQuantity = this.getTotalQuantity();
    const totalPrice = this.getTotalPrice();
    this.cart = { items: [...this.cartItems], totalQuantity, totalPrice };
    this.cartItemsSubject.next([...this.cartItems]);
    this.cartSubject.next(this.cart);
  }

  private getTotalQuantity(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  private getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.totalPrice, 0);
  }
}
