import { UserService } from './../../../services/user/user.service';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UploadService } from '../../../services/fileUpload/upload.service';
@Component({
  selector: 'app-edit-profile',
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css',
})
export class EditProfileComponent implements OnInit {
  @Input() user: any = {};
  @Output() getUpdatedUserData = new EventEmitter();
  updatedUser: any;

  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.updatedUser = {
      name: this.user.name,
      image: this.user.image,
      email: this.user.email,
      phone: this.user.phone,
      address: {
        street: this.user.address.street,
        city: this.user.address.city,
        state: this.user.address.state,
        zip: this.user.address.zip,
      },
      gender: this.user.gender,
    };
  }

  onUpdate() {
    this.userService.updateUser(this.user._id, this.updatedUser).subscribe({
      next: (res: any) => {
        console.log('User updated successfully:', res);
        this.getUpdatedUserData.emit();
      },
      error: (error: any) => {
        console.error('User update failed:', error);
        alert('User update failed!');
      },
    });
  }

  onSubmit() {
    this.onUpdate();
  }
}
