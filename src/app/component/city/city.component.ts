import { Component } from '@angular/core';
import { CouponService } from '../../services/coupon/coupon.service';
import { LoaderComponent } from '../loader/loader.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CityService } from '../../services/city/city.service';
import { AlertService } from '../../services/alert/alert.service';

@Component({
  selector: 'app-city',
  imports: [LoaderComponent, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './city.component.html',
  styleUrl: './city.component.css'
})
export class CityComponent {
  isLoaded: boolean = false;
  tableData: any;
  cityForm!: FormGroup;

  constructor(
    private cityService: CityService,
    private alertService: AlertService,
    private fb: FormBuilder 
  ) {
  }


  ngOnInit() {
    this.getAllCities()
    this.cityForm = this.fb.group({
      _id: [''],
      cityName: ['', [Validators.required, Validators.maxLength(30)]],
      state: ['', [Validators.required, Validators.maxLength(2)]]
    });
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

  addNewCity() {
    this.isLoaded = true;
    this.cityService.addCity(this.cityForm.value).subscribe({
      next: (data: any) => {
        this.cityService.getAllCities().subscribe()
        this.cityForm.reset();
        this.isLoaded = false;
        this.alertService.showSuccess('Added new city');
      },
      error: (error) => {
        this.isLoaded = false;
        this.alertService.showError(error.error.message);
      }
    })
  }

  editCity(item: any) {
    this.cityForm.patchValue({
      _id: item._id,
      cityName: item.cityName,
      state: item.state
    })
  }

  cancle(){
    this.cityForm.reset();
  }

  onUpdateCity() {
    this.isLoaded = true;
    this.cityService.updateCity(this.cityForm.value._id, this.cityForm.value).subscribe({
      next: (data: any) => {
        this.cityService.getAllCities().subscribe()
        this.isLoaded = false;
        this.cityForm.reset();
        this.alertService.showSuccess('Updated city');
      },
      error: (error) => {
        this.isLoaded = false;
        this.alertService.showError(error.error.message);
      }
    })
  }


  onDeleteCity(id: string) {
    this.isLoaded = true;
    this.cityService.deleteCity(id).subscribe({
      next: (data: any) => {
        this.cityService.getAllCities().subscribe()
        this.isLoaded = false;
        this.alertService.showSuccess('Deleted city');
      },
      error: (error) => {
        this.isLoaded = false;
        this.alertService.showError(error.error.message);
      }
    })
  }


}
