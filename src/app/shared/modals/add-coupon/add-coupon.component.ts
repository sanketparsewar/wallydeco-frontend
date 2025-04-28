import { Component, EventEmitter, Output, ViewChild, ElementRef, Input, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CouponService } from '../../../services/coupon/coupon.service';
import { DashboardService } from '../../../services/dashboard/dashboard.service';
import { AlertService } from '../../../services/alert/alert.service';

declare var bootstrap: any; // for Bootstrap 5 modal

@Component({
  selector: 'app-add-coupon',
  imports: [FormsModule, CommonModule],
  templateUrl: './add-coupon.component.html',
  styleUrl: './add-coupon.component.css'
})
export class AddCouponComponent {
  @Input() couponData!: any;
  @Output() getAllCoupons = new EventEmitter();
  @ViewChild('addCouponModal') modalRef!: ElementRef;
  isLoaded: boolean = false;
  isEdit: boolean = false;
  coupon: any = {
    code: '',
    description: '',
    discount: '',
    startDate: '',
    endDate: '',
    minAmount: '',
  };

  today: string = '';
  endDateMin: string = '';

  constructor(private couponService: CouponService,private alertService:AlertService,
    private dashboardService: DashboardService) { }

  ngOnInit() {
    const currentDate = new Date();
    this.today = currentDate.toISOString().split('T')[0];
    this.endDateMin = this.today; // initially, endDate minimum is also today
  }

  onStartDateChange() {
    if (this.coupon.startDate) {
      this.endDateMin = this.coupon.startDate;
      // update end date's minimum whenever start date changes
      if (this.coupon.endDate && this.coupon.endDate < this.coupon.startDate) {
        this.coupon.endDate = ''; // reset end date if it's invalid
      }
    }
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['couponData']) {
      if (this.couponData) {
        this.coupon = { ...this.couponData };
        if (this.coupon.startDate) {
          this.coupon.startDate = this.coupon.startDate.split('T')[0];
        }
        if (this.coupon.endDate) {
          this.coupon.endDate = this.coupon.endDate.split('T')[0];
        }
      } else {
        this.resetForm();
      }
    }
  }


  addCoupon() {
    this.couponService.createCoupon(this.coupon).subscribe({
      next: (data: any) => {
        this.isLoaded = false;
        this.getAllCoupons.emit();
        this.resetForm();
        this.closeModal();
        this.dashboardService.getDashboardData().subscribe();

      },
      error: (error) => {
        this.isLoaded = false;
        this.alertService.showError(error.error.message)
      }
    });
  }

  onUpdate() {
    this.couponService.updateCoupon(this.couponData._id, this.coupon).subscribe({
      next: (data: any) => {
        this.getAllCoupons.emit();
        this.resetForm();
        this.closeModal(); // 👈 close modal after success
        this.dashboardService.getDashboardData().subscribe();
        this.isLoaded = false;
      },
      error: (error) => {
        this.isLoaded = false;
        this.alertService.showError(error.error.message)
        
      }
    });
  }

  resetForm() {
    this.coupon = {
      code: '',
      discount: '',
      description: '',
      startDate: '',
      endDate: '',
      minAmount: '',
    };
    this.today = '';
    this.endDateMin = '';
  }

  closeModal() {
    this.resetForm();
    const modalElement = this.modalRef.nativeElement;
    const modalInstance = bootstrap.Modal.getInstance(modalElement)
    modalInstance.hide();
  }
}
