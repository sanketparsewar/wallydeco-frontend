import { Component } from '@angular/core';
import { FooterComponent } from '../../component/footer/footer.component';

@Component({
  selector: 'app-cart',
  imports: [FooterComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {




  changeQuantity(qty:number){

  }
}
