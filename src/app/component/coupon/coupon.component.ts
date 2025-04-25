import { Component, ElementRef, ViewChild } from '@angular/core';
import { LoaderComponent } from '../loader/loader.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CouponService } from '../../services/coupon/coupon.service';
import { AddCouponComponent } from '../../shared/modals/add-coupon/add-coupon.component';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { ConfirmService } from '../../services/confirm/confirm.service';
declare var bootstrap: any; // for Bootstrap 5 modal

@Component({
  selector: 'app-coupon',
  imports: [LoaderComponent, CommonModule, LoaderComponent, FormsModule, AddCouponComponent],

  templateUrl: './coupon.component.html',
  styleUrl: './coupon.component.css'
})
export class CouponComponent {
  isLoaded: boolean = false;
  @ViewChild('addCouponModal') modalRef!: ElementRef;

  tableData: any;
  couponData: any;
  constructor(
    private couponService: CouponService,
    private dashboardService: DashboardService,
    private confirmService: ConfirmService,
  ) { }

  ngOnInit() {
    this.getAllCoupons()
  }

  getAllCoupons() {
    this.isLoaded = true;
    this.couponService.getCoupons().subscribe({
      next: async (data: any) => {
        this.tableData = data.coupons;
        this.isLoaded = false;
      },
      error: (error) => {
        this.isLoaded = false;
        console.log(error);
      }
    })
  }

  editCoupon(item: any) {
    this.couponData = { ...item }; // Create a copy to avoid direct reference
    this.openModal();
  }

  openModal() {
    const modalElement = document.getElementById('addCouponModal');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }

  deleteCoupon(id: string) {
    this.confirmService.showConfirm('delete this coupon').then((confirmed: boolean) => {
      if (confirmed) {
        this.isLoaded = true;
        this.couponService.deleteCoupon(id).subscribe({
          next: (data: any) => {
            this.getAllCoupons();
            this.dashboardService.getDashboardData().subscribe();
            this.isLoaded = false;
          },
          error: (error) => {
            this.isLoaded = false;
            console.log(error);
          }
        })
      }
    })
  }

}
