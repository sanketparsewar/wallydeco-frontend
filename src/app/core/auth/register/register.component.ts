import { AlertService } from './../../../services/alert/alert.service';
import { CommonModule } from '@angular/common';
import { AuthService } from './../../../services/auth/auth.service';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Iuser } from '../../../shared/models/user.interface';

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
  constructor(private authService: AuthService, private router: Router,private alertService:AlertService) {}

  onRegister() {
    this.authService.registerUser(this.userData).subscribe({
      next: (res) => {
        this.alertService.showSuccess(res.message);
        this.router.navigateByUrl('/auth/login');
      },
      error: (error) => {
        this.alertService.showError(error.error.message)
      },
    });
  }
}
