import { Component, EventEmitter, Output, ViewChild, ElementRef, Input, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CouponService } from '../../../services/coupon/coupon.service';
import { DashboardService } from '../../../services/dashboard/dashboard.service';

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
    isActive: false,
  };

  constructor(private couponService: CouponService,
    private dashboardService: DashboardService) { }

  ngOnInit() { }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['couponData']) {
      if (this.couponData) {
        this.coupon = { ...this.couponData };
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
        this.closeModal(); // 👈 close modal after success
        this.dashboardService.getDashboardData().subscribe();

      },
      error: (error) => {
        this.isLoaded = false;
        console.log(error.error.message);
      }
    });
  }

  onUpdate() {
    this.couponService.updateCoupon(this.coupon._id, this.coupon).subscribe({
      next: (data: any) => {
        this.getAllCoupons.emit();
        this.resetForm();
        this.closeModal(); // 👈 close modal after success
        this.dashboardService.getDashboardData().subscribe();
        this.isLoaded = false;
      },
      error: (error) => {
        this.isLoaded = false;
        console.log(error.error.message);
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
      isActive: false,
    };
  }

  closeModal() {
    const modalElement = this.modalRef.nativeElement;
    const modalInstance = bootstrap.Modal.getInstance(modalElement)
    modalInstance.hide();
  }
}
