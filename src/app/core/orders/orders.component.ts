import { Component, inject, OnInit } from '@angular/core';
import { FooterComponent } from '../../component/footer/footer.component';
import { LoaderComponent } from '../../component/loader/loader.component';
import { AuthService } from '../../services/auth/auth.service';
import { OrderService } from '../../services/order/order.service';
import { CommonModule, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert/alert.service';

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
  router = inject(Router);
  constructor(private authService: AuthService, private orderService: OrderService, private alertService: AlertService) {
    this.getOrder()

  }
  ngOnInit(): void {

  }

  getOrder() {
    this.isLoaded = true;
    this.orderService.getUserOrders().subscribe({
      next: (res: any) => {
        this.tableData = res;
        this.isLoaded = false;
      },
      error: (error: any) => {
        this.alertService.showError(error.error.message);
        this.isLoaded = false;
      }
    })
  }


  orderDetails(orderId: string) {
    this.router.navigate(['user', 'order-details', orderId]);
  }

  back() {
    window.history.back();
  }


}
