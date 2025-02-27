import { ConfirmService } from './../../../services/confirm/confirm.service';
import { AlertService } from './../../../services/alert/alert.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UploadService } from '../../../services/fileUpload/upload.service';
import { UserService } from '../../../services/user/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-profile-picture',
  imports: [CommonModule],
  templateUrl: './edit-profile-picture.component.html',
  styleUrl: './edit-profile-picture.component.css',
})
export class EditProfilePictureComponent {
  @Input() user: any = {};
  @Output() getUpdatedUserData = new EventEmitter();
  updatedUser: any;

  isLoaded: boolean = false;
  selectedFile: File | null = null;

  constructor(
    private uploadService: UploadService,
    private userService: UserService,
    private alertService: AlertService,
    private confirmService: ConfirmService
  ) {}
  ngOnInit(): void {
    this.updatedUser = {
      name: this.user?.name,
      image: this.user?.image,
      email: this.user?.email,
      phone: this.user?.phone,
      address: {
        street: this.user?.address.street,
        city: this.user?.address.city,
        state: this.user?.address.state,
        zip: this.user?.address.zip,
      },
      gender: this.user?.gender,
    };
  }

  onFileSelected(event: any): void {
    console.log(this.selectedFile)
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0]; // Select the first file
      console.log(this.selectedFile)
    }
  }
  uploadProfileFile() {
    this.confirmService
      .showConfirm('Update Profile')
      .then((isConfirmed: any) => {
        if (isConfirmed) {
          this.update();
        }
      });
  }
  update() {
    this.isLoaded = true;
    if (!this.selectedFile) {
      console.error('No file selected');
      return;
    }
    this.uploadService
      .uploadFile(this.selectedFile, 'wallydeco/profile')
      .subscribe({
        next: (res: any) => {
          this.updatedUser.image = res.file.url;
          this.onUpdate();
        },
        error: (error: any) => {
          console.error('File upload failed:', error);
        },
      });
  }

  onUpdate() {
    this.userService.updateUser(this.user?._id, this.updatedUser).subscribe({
      next: (res: any) => {
        this.alertService.showSuccess(res.message);
        this.selectedFile = null;
        this.isLoaded = false;
      },
      error: (error: any) => {
        this.alertService.showError(error.error.message);
        this.isLoaded = false;
      },
    });
  }

  onClose() {
    this.getUpdatedUserData.emit();
  }
}
