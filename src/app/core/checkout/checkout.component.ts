import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { filter, Observable, tap } from 'rxjs';
import { IcartItem } from '../../shared/store/cart.state';
import { selectCartItems } from '../../shared/store/cart.selectors';
import { Store } from '@ngrx/store';
import { AuthService } from '../../services/auth/auth.service';
import { EditProfileComponent } from '../../shared/modals/edit-profile/edit-profile.component';
import { Iuser } from '../../shared/models/user.interface';
import { ConfirmService } from '../../services/confirm/confirm.service';
import { AlertService } from '../../services/alert/alert.service';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule, EditProfileComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  store = inject(Store);
  loggedUser: any;
  cartItems: any;
  isLoaded: boolean = false
  constructor(private authService: AuthService, private confirmService: ConfirmService, private alertService: AlertService) { }
  cartItems$: Observable<IcartItem[]> = this.store.select(selectCartItems);
  discount: number = 0
  cartTotal: number = 0
  finalTotal: number = 0
  deliveryCharges: number = 0
  ngOnInit(): void {
    this.getCartData()
    this.getLoggedUser()
  }

  getCartData() {
    this.cartItems$.subscribe({
      next: (cartItems) => {
        if (cartItems.length == 0) {
          this.cartItems = JSON.parse(localStorage.getItem('cartItems') || '')
        } else {
          this.cartItems = cartItems;
        }
      }
    })
    this.cartTotal = JSON.parse(localStorage.getItem('cartTotal') || '')
    this.deliveryCharges = JSON.parse(localStorage.getItem('deliveryCharges') || '')
    this.discount = JSON.parse(localStorage.getItem('discount') || '')
    this.finalTotal = JSON.parse(localStorage.getItem('finalTotal') || '')
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

  back() {
    this.confirmService.showConfirm('exit to cart page').then((confirmed: boolean) => {
      if (confirmed) {
        history.back()
      }
    });
  }

  shippingCost = 5.99;
  taxRate = 0.08;

  get subtotal(): number {
    // return this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    return 123
  }

  get tax(): number {
    return parseFloat((this.subtotal * this.taxRate).toFixed(2));
  }

  get total(): number {
    return parseFloat((this.subtotal + this.shippingCost + this.tax).toFixed(2));
  }

  placeOrder(): void {
    // Implement order placement logic
    alert('Order placed successfully!');
  }
}
