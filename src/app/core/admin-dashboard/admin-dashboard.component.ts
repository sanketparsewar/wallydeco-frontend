import { WallpaperService } from './../../services/wallpaper/wallpaper.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AddWallpaperComponent } from '../../shared/modals/add-wallpaper/add-wallpaper.component';
import { WallpaperDataTableComponent } from '../../component/wallpaper-data-table/wallpaper-data-table.component';
import { OrderDataTableComponent } from '../../component/order-data-table/order-data-table.component';

@Component({
  selector: 'app-admin-dashboard',
  imports: [
    CommonModule,
    FormsModule,
    WallpaperDataTableComponent,
    OrderDataTableComponent,
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
})
export class AdminDashboardComponent implements OnInit {
  tableData: any;
  // option: string='orders';
  option: string = 'wallpapers';

  constructor(private wallpaperService: WallpaperService) {}

  onOption(option: string) {
    this.option = option;
    console.log(this.option);
  }

  ngOnInit() {
    // this.getAllWallpapers()
  }

  // getAllWallpapers(){
  //   this.wallpaperService.getWallpapers().subscribe({
  //     next: (data: any) => {
  //       this.tableData=data
  //       console.log(this.tableData)
  //     },
  //     error: (error) => {
  //       console.error('Error fetching wallpapers:', error);
  //     }
  //   })
  // }
}
