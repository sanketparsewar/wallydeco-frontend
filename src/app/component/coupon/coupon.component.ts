import { Component } from '@angular/core';
import { LoaderComponent } from '../loader/loader.component';
import { CommonModule } from '@angular/common';
import { WallpaperService } from '../../services/wallpaper/wallpaper.service';
import { AlertService } from '../../services/alert/alert.service';
import { ConfirmService } from '../../services/confirm/confirm.service';
import { CategoryService } from '../../services/category/category.service';
import { debounceTime, Subject } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../services/order/order.service';
import { CityService } from '../../services/city/city.service';
import { CouponService } from '../../services/coupon/coupon.service';
@Component({
  selector: 'app-coupon',
  imports: [LoaderComponent, CommonModule, LoaderComponent, FormsModule],

  templateUrl: './coupon.component.html',
  styleUrl: './coupon.component.css'
})
export class CouponComponent {
  isLoaded: boolean = false;
  tableData: any;
  constructor(
    private couponService: CouponService,
  ) { }

  ngOnInit() {
    this.getAllCoupons()
  }

  getAllCoupons() {
    this.isLoaded = true;
    this.couponService.getCoupons().subscribe({
      next: async (data: any) => {
        this.tableData = data.coupons;
        console.log(this.tableData);
        this.isLoaded = false;
      },
      error: (error) => {
        this.isLoaded = false;
        console.log(error);
      }
    })
  }

}
