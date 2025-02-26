import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../../component/footer/footer.component';
import { CartService } from '../../services/cart/cart.service';
import { Icart, IcartItem } from '../../shared/models/cart.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [FooterComponent,CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit{
  cartItems: IcartItem[] = [];
  cart!:Icart;
  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.getCart();
  }

  getCart() {
    this.cartService.cart$.subscribe({
      next: (res) => {
        this.cart = res;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  addQuantity(id:string) {
    this.cartService.addQuantity(id);
  }
  minusQuantity(id:string) {
    this.cartService.minusQuantity(id);
  }
}
