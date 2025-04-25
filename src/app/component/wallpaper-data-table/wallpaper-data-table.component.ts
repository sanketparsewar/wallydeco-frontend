import { ConfirmService } from './../../services/confirm/confirm.service';
import { AlertService } from './../../services/alert/alert.service';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { WallpaperService } from '../../services/wallpaper/wallpaper.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddWallpaperComponent } from '../../shared/modals/add-wallpaper/add-wallpaper.component';
import { LoaderComponent } from '../loader/loader.component';
import { debounceTime, Subject } from 'rxjs';
import { CategoryService } from '../../services/category/category.service';
import { DashboardService } from '../../services/dashboard/dashboard.service';
declare var bootstrap: any; // for Bootstrap 5 modal

@Component({
  selector: 'app-wallpaper-data-table',
  imports: [
    CurrencyPipe,
    FormsModule,
    CommonModule,
    AddWallpaperComponent,
    LoaderComponent,
  ],
  templateUrl: './wallpaper-data-table.component.html',
  styleUrl: './wallpaper-data-table.component.css',
})
export class WallpaperDataTableComponent {
  isLoaded: boolean = false;
  isEdit: boolean = false;
  tableData: any;
  totalPages: number[] = [];
  categories = [];
  wallpaperData: any;
  queryParameter: any = {
    search: '',
    category: '',
    price: '',
    stock: '',
    page: 1, // Default page 1
    limit: 10, // Default 10 items per page
  };

  @ViewChild('addWallpaperModal') modalRef!: ElementRef;

  private searchSubject = new Subject<void>(); // Debounce trigger
  constructor(
    private wallpaperService: WallpaperService,
    private alertService: AlertService,
    private confirmService: ConfirmService,
    private categoryService: CategoryService,
    private dashboardService:DashboardService
  ) {
    this.categoryService.categories$.subscribe((data: any) => {
      this.categories = data.map((cat: any) => cat.name);
    });
  }

  ngOnInit() {
    this.isLoaded = true;
    this.getAllWallpapers();
    this.searchSubject.pipe(debounceTime(500)).subscribe(() => {
      this.getAllWallpapers();
    });
  }


  getAllWallpapers() {
    this.totalPages = [];
    this.wallpaperService.getWallpapers(this.queryParameter).subscribe({
      next: async (data: any) => {
        this.tableData = await data.wallpapers;
        console.log(this.tableData)
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


  editWallpaper(item: any) {
    this.wallpaperData = { ...item }; // Create a copy to avoid direct reference
    this.openModal();
  }


  openModal() {
    const modalElement = document.getElementById('addWallpaperModal');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }


  deleteWallpaper(id: string) {
    this.confirmService
      .showConfirm('Deleted Wallpaper')
      .then((isConfirmed: any) => {
        if (isConfirmed) {
          this.wallpaperService.deleteWallpaper(id).subscribe({
            next: (res) => {
              this.alertService.showSuccess(res.message);
              this.dashboardService.getDashboardData().subscribe();
              this.getAllWallpapers();
              this.isLoaded = false;

            },
            error: (error) => {
              this.alertService.showError(error.error.message);
              this.isLoaded = false;
              
            },
          });
        }
      });
  }


}
