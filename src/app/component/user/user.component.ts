import { Component } from '@angular/core';
import { CouponService } from '../../services/coupon/coupon.service';
import { LoaderComponent } from '../loader/loader.component';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-user',
  imports: [LoaderComponent,CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  isLoaded: boolean = false;
  tableData: any;
  constructor(
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.getAllUsers()
  }

  getAllUsers() {
    this.isLoaded = true;
    this.userService.getUsers().subscribe({
      next: async (data: any) => {
        this.tableData = data.users;
        console.log(this.tableData);
        this.isLoaded = false;
      },
      error: (error) => {
        this.isLoaded = false;
        console.log(error);
      }
    })
  }

}
