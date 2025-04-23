import { Component } from '@angular/core';
import { CouponService } from '../../services/coupon/coupon.service';
import { LoaderComponent } from '../loader/loader.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CityService } from '../../services/city/city.service';

@Component({
  selector: 'app-city',
  imports: [LoaderComponent, FormsModule, CommonModule],
  templateUrl: './city.component.html',
  styleUrl: './city.component.css'
})
export class CityComponent {
  isLoaded: boolean = false;
  tableData: any;
  constructor(
    private cityService: CityService,
  ) {
  }


  ngOnInit() {
    this.getAllCities()
  }


  getAllCities() {
    this.isLoaded = true;
    this.cityService.cities$.subscribe({
      next: (data: any) => {
        this.tableData = data;
        this.isLoaded = false;
      }
    })
  }

}
