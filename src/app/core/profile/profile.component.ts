import { AuthService } from './../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from './../../services/local/local-storage.service';
import { UserService } from './../../services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { EditProfileComponent } from '../../shared/modals/edit-profile/edit-profile.component';
import { LoaderComponent } from '../../component/loader/loader.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, EditProfileComponent, LoaderComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  user: any;
  isLoaded: boolean = false;
  isOpen:boolean=false
  constructor(private router:Router,
    private userService: UserService,
    private authService: AuthService,
    // private localStorageService: LocalStorageService
  ) {}

  ngOnInit() {
    this.isLoaded = true;
    this.authService.getLoggedUser().subscribe({
      next: (data: any) => {
        console.log('User data:', data);
        this.user = data.user;
        this.isLoaded = false;
      },
      error: (error: any) => {
        this.isLoaded = false;
        console.error('Error fetching user data:', error);
        this.router.navigateByUrl('/auth/login');
      },
    })
  }
  openModal() {
    console.log("open from profile clicke")
    this.isOpen = true;
  }

  logout(){
    this.authService.logoutUser().subscribe({
      next: () => {
        console.log('User logged out');
        this.router.navigate(['/home']);
      },
      error: (error: any) => {
        console.error('Error logging out user:', error);
      }
    })
  }
}
