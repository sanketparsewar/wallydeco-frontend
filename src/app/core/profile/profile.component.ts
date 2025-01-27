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

  constructor(private router:Router,
    private userService: UserService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit() {
    this.isLoaded = false;
    if (this.localStorageService.getItem('token')) {
      this.userService.getUser()?.subscribe({
        next: (data: any) => {
          console.log('User data:', data);
          this.user = data;
          this.isLoaded = true;
        },
        error: (error: any) => {
          console.error('Error fetching user data:', error);
        },
      });
    }else{
      this.router.navigate(['/login']);
    }
  }

  logout(){
    this.localStorageService.removeItem('token');
    this.router.navigate(['/home']);
  }
}
