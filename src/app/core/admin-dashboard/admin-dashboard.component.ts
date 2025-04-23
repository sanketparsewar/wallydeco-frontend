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

@Component({
  selector: 'app-admin-dashboard',
  imports: [
    CommonModule,
    FormsModule,
    WallpaperDataTableComponent,
    OrderDataTableComponent,
    FooterComponent,
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
})
export class AdminDashboardComponent implements OnInit {
  option: string = 'orders';
  dashboardData: IDashboard = {
    totalCancelledOrders: 0,
    totalCities: 0,
    totalCoupons: 0,
    totalDeliveredOrders: 0,
    totalOrders: 0,
    totalPendingOrders: 0,
    totalSales: 0,
    totalShippedOrders: 0,
    totalSold: 0,
    totalStock: 0,
    totalUsedCoupons: 0,
    totalUsers: 0,
    totalWallpapers: 0,
    totalCategories: 0,
  };

  constructor(private dashboardService: DashboardService) { }

  onOption(option: string) {
    this.option = option;
  }

  ngOnInit() {
    this.getDashboardData()
  }


  getDashboardData() {
    this.dashboardService.getDashboardData().subscribe({
      next: (data: any) => {
        this.dashboardData = data
        console.log(this.dashboardData);
        this.dashboardData.totalOrders = data.totalOrders;
        this.dashboardData.totalSales = data.totalSales;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

}
