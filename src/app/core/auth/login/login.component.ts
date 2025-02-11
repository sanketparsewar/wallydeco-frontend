import { LocalStorageService } from './../../../services/local/local-storage.service';
import { AuthService } from './../../../services/auth/auth.service';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

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
    // private localStorageService: LocalStorageService
  ) {}

  onLogin() {
    this.authService.loginUser(this.loginData).subscribe({
      next: (res) => {
        console.log(res);
        // this.localStorageService.setItem('token', res.token);
        // history.back()
        this.router.navigateByUrl('/home');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
