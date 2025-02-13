import { Component } from '@angular/core';
import { WallpaperService } from '../../services/wallpaper/wallpaper.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormControlName, FormsModule } from '@angular/forms';
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
  totalPages: number = 0;
  category: string[] = [
    'floral-pushpa',
    'trending',
    'top-picked',
    'frames',
    'abstract-frames',
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
  constructor(private wallpaperService: WallpaperService) {}

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
        this.totalPages = data.totalPages; // Store total pages for pagination UI
        this.isLoaded = false;
        console.log('tabledata', this.tableData);
        console.log('totalpage', this.totalPages);
      },
      error: (error) => {
        console.error('Error fetching wallpapers:', error);
        this.isLoaded = false;
      },
    });
  }

  onFilterChange() {
    console.log(this.queryParameter);
    this.searchSubject.next(); // Triggers the debounced API call
  }

  changePage(newPage: number) {
    if (newPage >= 1 && newPage <= this.totalPages) {
      this.queryParameter.page = newPage;
      this.getAllWallpapers(); // Fetch new page data
    }
  }

  onDelete(id: string) {
    if (confirm('Are you sure you want to delete?')) {
      this.wallpaperService.deleteWallpaper(id).subscribe({
        next: () => {
          console.log('Wallpaper deleted successfully');
          this.getAllWallpapers();
        },
        error: (error) => {
          console.error('Error deleting wallpaper:', error);
        },
      });
    }
  }
}
