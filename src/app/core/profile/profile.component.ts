import { ConfirmService } from './../../services/confirm/confirm.service';
import { AlertService } from './../../services/alert/alert.service';
import { AuthService } from './../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { UserService } from './../../services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { EditProfileComponent } from '../../shared/modals/edit-profile/edit-profile.component';
import { LoaderComponent } from '../../component/loader/loader.component';
import { Router, RouterLink } from '@angular/router';
import { EditProfilePictureComponent } from '../../shared/modals/edit-profile-picture/edit-profile-picture.component';
import Swal from 'sweetalert2';
import { FooterComponent } from '../../component/footer/footer.component';

@Component({
  selector: 'app-profile',
  imports: [
    CommonModule,
    EditProfileComponent,
    LoaderComponent,
    RouterLink,
    EditProfilePictureComponent,
    FooterComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  user: any;
  isLoaded: boolean = false;
  constructor(
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService,
    private confirmService: ConfirmService
  ) {}

  ngOnInit() {
    this.getLoggedUser();
  }

  getLoggedUser() {
    this.isLoaded = true;
    this.authService.getLoggedUser().subscribe({
      next: (data: any) => {
        this.user = data.user;
        this.isLoaded = false;
      },
      error: (error: any) => {
        this.isLoaded = false;
        this.alertService.showError(error.error.message);
        this.router.navigateByUrl('/auth/login');
      },
    });
  }

  logout() {
    this.confirmService.showConfirm('Logout').then((confirmed: any) => {
      if (confirmed) {
        this.authService.logoutUser().subscribe({
          next: () => {
            this.alertService.showSuccess('Logged out.')
            this.router.navigate(['/home']);
          },
          error: (error: any) => {
            this.alertService.showError(error.error.message)
          },
        });
      }
    });
  }
}
