
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { AlertService } from '../../services/alert/alert.service';
import { ConfirmService } from '../../services/confirm/confirm.service';
import { CommonModule } from '@angular/common';
import { EditProfileComponent } from '../../shared/modals/edit-profile/edit-profile.component';
import { LoaderComponent } from '../../component/loader/loader.component';
import { EditProfilePictureComponent } from '../../shared/modals/edit-profile-picture/edit-profile-picture.component';
import { FooterComponent } from '../../component/footer/footer.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  imports: [
    CommonModule,
   LoaderComponent,
    RouterLink,
    FooterComponent,
    EditProfileComponent,
    EditProfilePictureComponent
  ],
})
export class ProfileComponent implements OnInit {
  loggedUser: any = null;
  isLoaded:boolean=false;
  constructor(
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService,
    private confirmService: ConfirmService
  ) {
    this.authService.loggedUser$.subscribe({
      next: (user) => {
        this.loggedUser = user;
        console.log('1',this.loggedUser,Date.now());
      },
    });
  }


  ngOnInit() {
  }
  getLoggedUser(){
    this.authService.getLoggedUser().subscribe({
      next: (data: any) => {
        this.loggedUser = data.user;
      },
    });
  }

  logout() {
    this.confirmService.showConfirm('Logout').then((confirmed: boolean) => {
      if (confirmed) {
        this.authService.logoutUser().subscribe({
          next: () => {
            this.alertService.showSuccess('Logged out.');
            this.router.navigate(['/home']);
          },
          error: (error) => {
            this.alertService.showError(error.error.message);
          },
        });
      }
    });
  }
}
