import { ConfirmService } from './../../services/confirm/confirm.service';
import { AlertService } from './../../services/alert/alert.service';
import { Component } from '@angular/core';
import { WallpaperService } from '../../services/wallpaper/wallpaper.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddWallpaperComponent } from '../../shared/modals/add-wallpaper/add-wallpaper.component';
import { LoaderComponent } from '../loader/loader.component';
import { debounceTime, Subject } from 'rxjs';
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
  tableData: any;
  totalPages: number[] = [];
  category: string[] = [
    'floral',
    'trending',
    'top-picked',
    'frames',
    'abstract-frames',
    'scrollable',
  ];
  queryParameter: any = {
    search: '',
    category: '',
    price: '',
    stock: '',
    page: 1, // Default page 1
    limit: 10, // Default 10 items per page
  };
  private searchSubject = new Subject<void>(); // Debounce trigger
  constructor(
    private wallpaperService: WallpaperService,
    private alertService: AlertService,
    private confirmService: ConfirmService
  ) {}

  ngOnInit() {
    this.getAllWallpapers();

    this.searchSubject.pipe(debounceTime(500)).subscribe(() => {
      this.getAllWallpapers();
    });
  }

  getAllWallpapers() {
    this.isLoaded = true;
    this.wallpaperService.getWallpapers(this.queryParameter).subscribe({
      next: async (data: any) => {
        this.tableData = await data.wallpapers;
        for (let i = 0; i < data.totalPages; i++) {
          this.totalPages.push(i); // Store total pages for pagination UI
        }
        this.isLoaded = false;
      },
      error: (error) => {
        console.error('Error fetching wallpapers:', error);
        this.isLoaded = false;
      },
    });
  }

  onFilterChange() {
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
              this.getAllWallpapers();
            },
            error: (error) => {
              this.alertService.showError(error.error.message);
            },
          });
        }
      });
  }
}
