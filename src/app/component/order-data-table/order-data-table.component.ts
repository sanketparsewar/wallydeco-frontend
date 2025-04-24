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
// import { io } from 'socket.io-client';
// import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-order-data-table',
  imports: [LoaderComponent, CommonModule, LoaderComponent, FormsModule],
  templateUrl: './order-data-table.component.html',
  styleUrl: './order-data-table.component.css'
})
export class OrderDataTableComponent {
  isLoaded: boolean = false;
  tableData: any;
  totalOrders: number = 0;
  totalSales: number = 0;
  totalPages: number[] = [];
  categories = [];
  cities: any;
  page: number = 0;
  queryParameter: any = {
    search: '',
    city: '',
    page: 1, // Default page 1
    limit: 10, // Default 10 items per page
  };
  // private socket: any;
  private searchSubject = new Subject<void>(); // Debounce trigger
  constructor(
    private wallpaperService: WallpaperService,
    private alertService: AlertService,
    private confirmService: ConfirmService,
    private categoryService: CategoryService,
    private orderService: OrderService,
    private cityService: CityService
  ) {
    this.categoryService.categories$.subscribe((data: any) => {
      this.categories = data.map((cat: any) => cat.name);
    });
  }


  ngOnInit() {
    this.getCities()
    this.getAllOrders();
    this.searchSubject.pipe(debounceTime(500)).subscribe(() => {
      this.getAllOrders();
    }
    );
  }


  getAllOrders() {
    this.isLoaded = true;
    this.totalPages = [];
    this.orderService.getAllOrders(this.queryParameter).subscribe({
      next: async (data: any) => {
        this.tableData = await data.orders;
        this.totalOrders = await data.totalOrders;
        this.page = data.page;
        this.queryParameter.page = data.page; // Reset to page 1 on new search
        for (let i = 0; i < data.totalPages; i++) {
          this.totalPages.push(i); // Store total pages for pagination UI
        }
        this.isLoaded = false;
      },
      error: (error) => {
        console.error(error.error.message);
        this.isLoaded = false;
      },
    });
  }

  search() {
    this.queryParameter.page = 1; // Reset to page 1 on new search
    this.searchSubject.next(); // Triggers the debounced API call
  }

  onFilterChange(event: any) {
    if (event.target.name == 'limit') {
      this.queryParameter.limit = event.target.value;
      this.queryParameter.page = 1; // Reset to page 1 on new search
    } else {
      this.queryParameter[event.target.name] = event.target.value;
    }
    this.searchSubject.next(); // Triggers the debounced API call
  }

  onDelete(id: string) {
    this.confirmService
      .showConfirm('Deleted Wallpaper')
      .then((isConfirmed: any) => {
        if (isConfirmed) {
          this.wallpaperService.deleteWallpaper(id).subscribe({
            next: (res) => {
              this.alertService.showSuccess(res.message);
            },
            error: (error) => {
              this.alertService.showError(error.error.message);
            },
          });
        }
      });
  }


  getCities() {
    this.cityService.cities$.subscribe({
      next: (data) => {
        this.cities = Array.isArray(data) ? data.map((city: any) => city.name) : [];
      },
      error: (error) => {
        console.error(error.error.message);
      },
    })
  }

  updateOrderStatus(id: string) {
    this.orderService.updateOrderStatus(id).subscribe({
      next: (res) => {
        this.alertService.showSuccess(res.message);
        this.getAllOrders();
      },
      error: (error) => {
        this.alertService.showError(error.error.message);
      },
    });
  }

}
