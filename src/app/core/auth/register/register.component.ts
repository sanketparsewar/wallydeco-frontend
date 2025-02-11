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
    role: 'customer',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zip: '',
    },
    gender: '',
  };
  constructor(private authService: AuthService, private router: Router) {}

  onRegister() {
    this.authService.registerUser(this.userData).subscribe({
      next: () => {
        console.log('User registered successfully');
        this.router.navigateByUrl('/auth/login');
      },
      error: (error) => {
        console.log('Error registering user', error);
      },
    });
  }
}
