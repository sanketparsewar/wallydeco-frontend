import { WallpaperService } from './../../services/wallpaper/wallpaper.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AddWallpaperComponent } from '../../shared/modals/add-wallpaper/add-wallpaper.component';
import { WallpaperDataTableComponent } from '../../component/wallpaper-data-table/wallpaper-data-table.component';
import { OrderDataTableComponent } from '../../component/order-data-table/order-data-table.component';
import { FooterComponent } from '../../component/footer/footer.component';
import { OrderService } from '../../services/order/order.service';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { IDashboard } from '../../shared/models/dashboard.interface';
import { LoaderComponent } from '../../component/loader/loader.component';
import { CouponComponent } from '../../component/coupon/coupon.component';
import { CityComponent } from '../../component/city/city.component';
import { CategoryComponent } from '../../component/category/category.component';

@Component({
  selector: 'app-admin-dashboard',
  imports: [
    CommonModule,
    FormsModule,
    WallpaperDataTableComponent,
    OrderDataTableComponent,
    FooterComponent,LoaderComponent,
    CouponComponent,
    CityComponent,
    CategoryComponent
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
})
export class AdminDashboardComponent implements OnInit {
  option: string = 'orders';
  isLoaded: boolean = false;

  dashboardData: IDashboard = {
    totalOrders: 0,
    totalSales: 0,
    totalPendingOrders: 0,
    totalDeliveredOrders: 0,
    totalShippedOrders: 0,
    totalCancelledOrders: 0,
    totalWallpapers: 0,
    totalStock: 0,
    totalSold: 0,
    totalCoupons: 0,
    totalActiveCoupons:0,
    totalInactiveCoupons:0,
    totalUsedCoupons: 0,
    totalCategories: 0,
    totalCities: 0,
    totalUsers: 0,
  };

  constructor(private dashboardService: DashboardService) { }

  onOption(option: string) {
    this.option = option;
  }

  ngOnInit() {
    this.getDashboardData()
  }


  getDashboardData() {
    this.isLoaded = true;
    this.dashboardService.getDashboardData().subscribe({
      next: (data: any) => {
        this.isLoaded = false;
        this.dashboardData = data
        console.log(this.dashboardData);
        this.dashboardData.totalOrders = data.totalOrders;
        this.dashboardData.totalSales = data.totalSales;
      },
      error: (error) => {
        this.isLoaded = false;

        console.log(error);
      },
    });
  }

}
