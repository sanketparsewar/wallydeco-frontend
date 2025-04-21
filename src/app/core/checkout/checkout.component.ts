import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { filter, Observable, tap } from 'rxjs';
import { IcartItem } from '../../shared/store/cart.state';
import { selectCartItems } from '../../shared/store/cart.selectors';
import { Store } from '@ngrx/store';
import { AuthService } from '../../services/auth/auth.service';
import { EditProfileComponent } from '../../shared/modals/edit-profile/edit-profile.component';
import { ConfirmService } from '../../services/confirm/confirm.service';
import { AlertService } from '../../services/alert/alert.service';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../services/order/order.service';
import { Router } from '@angular/router';
import {
  clearCart,
} from '../../shared/store/cart.actions';
import {
  trigger,
  transition,
  style,
  animate,
  state
} from '@angular/animations';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule, EditProfileComponent, FormsModule,],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
  animations: [
    trigger('fadeScaleIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.5)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0, transform: 'scale(0.5)' }))
      ])
    ])
  ]
})
export class CheckoutComponent implements OnInit {
  store = inject(Store);
  loggedUser: any;
  cartItems: any;
  isLoaded: boolean = false
  constructor(private authService: AuthService, private confirmService: ConfirmService, private alertService: AlertService, private orderService: OrderService, private router: Router) { }
  cartItems$: Observable<IcartItem[]> = this.store.select(selectCartItems);

  amountObj: any;
  selectedPayment: string = 'cod';
  upiId: string = ''
  showSuccessAnimation = false;



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
    this.amountObj = JSON.parse(localStorage.getItem('amountObj') || '')
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
  isValidUpi(upiId: string): boolean {
    // Basic UPI ID pattern check: something@bank
    const upiPattern = /^[\w.\-]{2,}@[a-zA-Z]{2,}$/;
    return upiPattern.test(upiId);
  }



  placeOrder() {
    this.isLoaded = true;
    // Validate UPI if selected
    if (this.selectedPayment === 'upi' && !this.isValidUpi(this.upiId)) {
      return;
    }

    // Validate address
    if (!this.loggedUser.address || !this.loggedUser.address.street) {
      this.alertService.showError('Please provide a complete shipping address');
      return;
    }

    // Prepare order data
    const orderData = {
      user: this.loggedUser._id,
      items: this.cartItems.map((item: any) => ({
        wallpaper: item.id,
        quantity: item.quantity,
        price: item.price
      })),
      totalAmount: this.amountObj.totalAmount,
      deliveryFee: this.amountObj.deliveryFee,
      discount: this.amountObj.discount,
      finalAmount: this.amountObj.finalTotal,
      couponCode: this.amountObj.couponCode,
      shippingAddress: this.loggedUser.address,
      paymentMethod: this.selectedPayment,
      upiId: this.selectedPayment === 'upi' ? this.upiId : undefined
    };

    this.orderService.placeOrder(orderData).subscribe({
      next: (res: any) => {
        this.isLoaded = false;
        this.clearCart();
        this.showSuccessAnimation = true;
        
        // Redirect after animation
        setTimeout(() => {
          this.router.navigate(['/user/order-details', res.savedOrder._id]);
          this.showSuccessAnimation = false;
        }, 5000);
      },
      error: (err) => {
        if (err.error?.error?.includes('Insufficient stock')) {
          this.alertService.showInfo(err.error.error);
        } else {
          this.alertService.showError(err.error?.message || 'Something went wrong. Please try again.');
        }
      }
    });
  }



  clearCart() {
    this.store.dispatch(clearCart());
    localStorage.removeItem('cartItems');
    localStorage.removeItem('amountObj');
  }


}
