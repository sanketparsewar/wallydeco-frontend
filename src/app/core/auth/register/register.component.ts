import { AlertService } from './../../../services/alert/alert.service';
import { CommonModule } from '@angular/common';
import { AuthService } from './../../../services/auth/auth.service';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Iuser } from '../../../shared/models/user.interface';
import { CityService } from '../../../services/city/city.service';

@Component({
  selector: 'app-register',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  userData: Iuser | any = {
    name: '',
    email: '',
    password: '',
    role: 'user',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zip: '',
    },
    gender: '',
  };
  cities: any = [];

  constructor(private cityService:CityService, private authService: AuthService, private router: Router, private alertService: AlertService) { 
    this.getCities()
  }

  onRegister() {
    this.authService.register(this.userData).subscribe({
      next: (res) => {
        this.alertService.showSuccess(res.message);
        this.router.navigateByUrl('/auth/login');
      },
      error: (error) => {
        this.alertService.showError(error.error.message)
      },
    });
  }

  getCities() {
    this.cityService.cities$.subscribe({
      next: (data) => {
        this.cities=data
      },
      error: (error) => {
        console.error(error.error.message);
      },
    })
  }

  onCityChange(event: any) {
    if(event.target.value === '') {
      this.userData.address.state = '';
      this.userData.address.city = '';
      return;
    }
    this.userData.address.city = event.target.value;
    const selectedState = this.cities.find((city: any) => city.name === event.target.value);
    this.userData.address.state= selectedState.state;
  }



}
