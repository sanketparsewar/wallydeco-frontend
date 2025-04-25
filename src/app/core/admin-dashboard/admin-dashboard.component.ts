import { WallpaperService } from './../../services/wallpaper/wallpaper.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
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
import { ActivatedRoute, Router } from '@angular/router';
import { UserComponent } from '../../component/user/user.component';
// import { io } from 'socket.io-client';
// import { environment } from '../../../environments/environment';
import { AlertService } from '../../services/alert/alert.service';
import { filter, tap } from 'rxjs';

@Component({
  selector: 'app-admin-dashboard',
  imports: [
    CommonModule,
    FormsModule,
    WallpaperDataTableComponent,
    OrderDataTableComponent,
    FooterComponent, LoaderComponent,
    CouponComponent,
    CityComponent,
    CategoryComponent,
    UserComponent,CurrencyPipe
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
})
export class AdminDashboardComponent implements OnInit {
  option: string = 'orders';
  isLoaded: boolean = false;
  // private socket: any;

  dashboardData: any = {
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
    totalActiveCoupons: 0,
    totalInactiveCoupons: 0,
    totalUsedCoupons: 0,
    totalCategories: 0,
    totalCities: 0,
    totalUsers: 0,
    totalUnpaidAmount:0,
    totalUpiOrders:0,
    totalCodOrders:0,
    totalPaidOrders:0

  };

  constructor(private dashboardService: DashboardService, private route: ActivatedRoute,
    private router: Router, private alertservice: AlertService) {
    // this.socket = io(environment.SOCKET_URL, {
    //   transports: ['websocket', 'polling'],
    //   withCredentials: true
    // });
  }


  onOption(option: string): void {
    // Step 1: Update the local variable that controls which section is visible (orders, wallpapers, etc.)
    this.option = option;
    // Step 2: Update the URL's query parameter 'option' without reloading or leaving the page
    this.router.navigate([], {
      // Use the current route as the base to stay on the same page/component
      relativeTo: this.route,
      // Set or update the query parameter ?option=value in the URL
      queryParams: { option },
      // Keep any existing query parameters and merge this new one with them
      // This prevents removing other params unintentionally
      queryParamsHandling: 'merge'
    });
  }


  ngOnInit() {
    this.getDashboardData()
    this.route.queryParams.subscribe(params => {
      this.option = params['option'] || 'orders';
    });
    // this.socket.on('receiveOrder', () => {
    //   this.alertservice.showSuccess('received')
    //   this.getDashboardData()
    // });
  }


  getDashboardData() {
    this.isLoaded = true;
    this.dashboardService.dashboard$.pipe(
      tap((data: any) => {
        if (!data) {
          setTimeout(() => {
            this.isLoaded = false;
          }, 1500);
        }
      }),
      filter(data => !!data)
    ).subscribe({
      next: (data: any) => {
        this.isLoaded = false;
        this.dashboardData = data
      },
    })
  }

}
