import { Component, inject, OnInit } from '@angular/core';
import { FooterComponent } from '../../component/footer/footer.component';
import { LoaderComponent } from '../../component/loader/loader.component';
import { AuthService } from '../../services/auth/auth.service';
import { filter, tap } from 'rxjs';
import { OrderService } from '../../services/order/order.service';
import { CommonModule, DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  imports: [FooterComponent, LoaderComponent, DatePipe, CommonModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {
  isLoaded: boolean = false;
  tableData: any;
  loggedUser: any;
  option: string = 'orders';
  router = inject(Router);
  constructor(private authService: AuthService, private orderService: OrderService) {
    // this.isLoaded = true
    // this.authService.loggedUser$
    //   .pipe(
    //     tap((user: any) => {
    //       if (!user) {
    //         setTimeout(() => {
    //           this.isLoaded = false;
    //         }, 1500);
    //       }
    //     }),
    //     filter(user => !!user)
    //   )
    //   .subscribe((user: any) => {
    //     this.loggedUser = user;
    //     this.getOrder()
    //     this.isLoaded = false;
    //   });
    this.getOrder()

  }
  ngOnInit(): void {

  }

  getOrder() {
    this.isLoaded = true;
    this.orderService.getUserOrders().subscribe({
      next: (res: any) => {
        this.tableData = res;
        console.log(this.tableData);
        this.isLoaded = false;
      },
      error: (err: any) => {
        console.error(err);
        this.isLoaded = false;
      }
    })
  }



  onOption(option: string) {
    this.option = option;
  }

  orderDetails(orderId: string) {
    this.router.navigate(['user', 'order-details', orderId]);
  }

}
