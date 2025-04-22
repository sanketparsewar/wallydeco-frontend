import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../services/order/order.service';
import { LoaderComponent } from '../../component/loader/loader.component';
import { DescriptionPipe } from '../../shared/customPipes/description.pipe';
import { ConfirmService } from '../../services/confirm/confirm.service';
import { AlertService } from '../../services/alert/alert.service';

@Component({
  selector: 'app-orderDetails',
  imports: [DatePipe, CurrencyPipe, CommonModule, LoaderComponent, DescriptionPipe],
  templateUrl: './orderDetails.component.html',
  styleUrls: ['./orderDetails.component.css']
})
export class OrderDetailsComponent implements OnInit {
  order: any;
  isLoaded: boolean = false;
  constructor(private confirmService: ConfirmService, private activatedRoute: ActivatedRoute, private orderService: OrderService, private alertService: AlertService) { }
  router = inject(Router)

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.getOrderDetails(params['id']);
      }
    });
  }
  getOrderDetails(id: string) {
    this.isLoaded = true;
    this.orderService.getOrderById(id).subscribe({
      next: (res: any) => {
        this.order = res;
        this.isLoaded = false;
      },
      error: (error: any) => {
        this.alertService.showError(error.error.message);
        this.isLoaded = false;
      }
    })
  }

  cancelOrder() {
    this.confirmService.showConfirm('cancle this order').then((confirmed: boolean) => {
      if (confirmed) {
        this.isLoaded = true;
        this.orderService.cancelOrder(this.order._id).subscribe({
          next: (res: any) => {
            this.order = res.order
            setTimeout(() => {
              this.isLoaded = false;
              this.alertService.showSuccess(res.message);
            }, 2000);
          },
          error: (error: any) => {
            this.alertService.showError(error.error.message);
            this.isLoaded = false;
          }
        })
      }
    });
  }


  back() {
    this.router.navigate(['/user/orders']);
  }

}
