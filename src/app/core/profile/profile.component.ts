import { AuthService } from './../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { UserService } from './../../services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { EditProfileComponent } from '../../shared/modals/edit-profile/edit-profile.component';
import { LoaderComponent } from '../../component/loader/loader.component';
import { Router, RouterLink } from '@angular/router';
import { EditProfilePictureComponent } from '../../shared/modals/edit-profile-picture/edit-profile-picture.component';

@Component({
  selector: 'app-profile',
  imports: [
    CommonModule,
    EditProfileComponent,
    LoaderComponent,
    RouterLink,
    EditProfilePictureComponent,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  user: any;
  isLoaded: boolean = false;
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.getLoggedUser();
  }

  getLoggedUser() {
    this.isLoaded = true;
    this.authService.getLoggedUser().subscribe({
      next: (data: any) => {
        this.user = data.user;
        console.log('User data:', data);
        this.isLoaded = false;
      },
      error: (error: any) => {
        this.isLoaded = false;
        console.error('Error fetching user data:', error);
        this.router.navigateByUrl('/auth/login');
      },
    });
  }

  logout() {
    this.authService.logoutUser().subscribe({
      next: () => {
        console.log('User logged out');
        this.router.navigate(['/home']);
      },
      error: (error: any) => {
        console.error('Error logging out user:', error);
      },
    });
  }
}
