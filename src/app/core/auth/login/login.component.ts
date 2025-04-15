import { AlertService } from './../../../services/alert/alert.service';
import { AuthService } from './../../../services/auth/auth.service';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginData: any = {
    email: '',
    password: '',
  };
  constructor(
    private authService: AuthService,
    private router: Router,
    private alertService:AlertService
  ) {}

  onLogin() {
    this.authService.loginUser(this.loginData).subscribe({
      next: (res) => {
        this.alertService.showSuccess('Login successful!');
        history.back()
        // this.router.navigateByUrl('/user/profile');
      },
      error: (err) => {
        this.alertService.showError(err.error.message);
      },
    });
  }
}
