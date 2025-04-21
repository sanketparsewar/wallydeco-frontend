import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../services/order/order.service';
import { LoaderComponent } from '../../component/loader/loader.component';
import { DescriptionPipe } from '../../shared/customPipes/description.pipe';

@Component({
  selector: 'app-orderDetails',
  imports: [DatePipe, CurrencyPipe, CommonModule, LoaderComponent,DescriptionPipe],
  templateUrl: './orderDetails.component.html',
  styleUrls: ['./orderDetails.component.css']
})
export class OrderDetailsComponent implements OnInit {
  order: any;
  isLoaded: boolean = false;
  constructor(private activatedRoute: ActivatedRoute, private orderService: OrderService) { }
  router=inject(Router)

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
        console.log(this.order);
        this.isLoaded = false;
      },
      error: (err: any) => {
        console.error(err);
        this.isLoaded = false;
      }
    })
  }

  back(){
    this.router.navigate(['/user/orders']);
  }

}
