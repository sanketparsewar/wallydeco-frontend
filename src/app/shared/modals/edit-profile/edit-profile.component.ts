import { AlertService } from './../../../services/alert/alert.service';
import { UserService } from './../../../services/user/user.service';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UploadService } from '../../../services/fileUpload/upload.service';
import { AuthService } from '../../../services/auth/auth.service';
import { CityService } from '../../../services/city/city.service';
@Component({
  selector: 'app-edit-profile',
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css',
})
export class EditProfileComponent implements OnInit {
  @Input() user: any = {};
  @Output() getUpdatedUserData = new EventEmitter();
  updatedUser: any;
  cities: any = [];
  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private authService:AuthService,
    private cityService: CityService,
  ) {}
  ngOnInit(): void {
    this.updatedUser = {
      name: this.user?.name,
      email: this.user?.email,
      phone: this.user?.phone,
      address: {
        street: this.user?.address.street,
        city: this.user?.address.city,
        state: this.user?.address.state,
        zip: this.user?.address.zip,
      },
      gender: this.user?.gender,
    };
  this.getCities()
  }

  onUpdate() {
    this.userService.updateUser(this.user?._id, this.updatedUser).subscribe({
      next: (res: any) => {
        this.alertService.showSuccess(res.message);
      },
      error: (error: any) => {
        this.alertService.showError(error.error.message);
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
    this.updatedUser.address.city = event.target.value;
    const selectedState = this.cities.find((city: any) => city.name === event.target.value);
    this.updatedUser.address.state= selectedState.state;
  }

 
  onSubmit() {
    this.onUpdate();
  }
}
