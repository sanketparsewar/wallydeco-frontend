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
import { filter, tap } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  imports: [
    CommonModule,
    LoaderComponent,
    EditProfileComponent,
    EditProfilePictureComponent,
    FooterComponent, RouterLink
  ],
})
export class ProfileComponent implements OnInit {
  loggedUser: any = null;
  isLoaded: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService,
    private confirmService: ConfirmService
  ) { }

  ngOnInit() {
    this.getLoggedUser();
  }

  getLoggedUser() {
    // this.isLoaded = true;
    // this.authService.getLoggedUser().subscribe({
    //   next: (data: any) => {
    //     this.loggedUser = data.user;
    //     this.isLoaded = false;
    //   },
    //   error: (error) => {
    //     this.alertService.showError('Login required');
    //     this.isLoaded = false;
    //   }
    // });
    this.authService.loggedUser$
      .pipe(
        tap((user: any) => {
          if (!user) {
            this.isLoaded = false
            this.router.navigateByUrl('/auth/login');
          }
        }),
        filter(user => !!user)
      )
      .subscribe((user: any) => {
        this.loggedUser = user;
        this.isLoaded = false;
        console.log(user);
      });
  }

  logout() {
    this.confirmService.showConfirm('Logout').then((confirmed: boolean) => {
      if (confirmed) {
        this.authService.logoutUser().subscribe({
          next: () => {
            this.alertService.showSuccess('Logged out.');
            this.router.navigate(['/auth/login']); // Redirect to login page after logout
          },
          error: (error) => {
            this.alertService.showError(error.error.message);
          }
        });
      }
    });
  }
}
