import { Component, inject, OnInit } from '@angular/core';
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
import { Store } from '@ngrx/store';
import {
  clearCart,
} from '../../shared/store/cart.actions';
import { UserService } from '../../services/user/user.service';
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
  store = inject(Store)
  constructor(
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService,
    private confirmService: ConfirmService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getLoggedUser();
  }

  getLoggedUser() {
    this.isLoaded = true
    this.authService.loggedUser$
      .pipe(
        tap((user: any) => {
          if (!user) {
            this.isLoaded = false
          }
        }),
        filter(user => !!user)
      )
      .subscribe((user: any) => {
        this.loggedUser = user;
        this.isLoaded = false;
      });
  }

  logout() {
    this.confirmService.showConfirm('Logout').then((confirmed: boolean) => {
      if (confirmed) {
        localStorage.removeItem('accessToken');
        this.router.navigate(['/auth/login']);
        this.clearCart()
        this.alertService.showSuccess('Logged out.');
      }
    });
  }

  clearCart() {
    this.store.dispatch(clearCart());
    localStorage.removeItem('cartItems');
    localStorage.removeItem('amountObj');
  }


}
