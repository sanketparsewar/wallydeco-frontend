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
    private userService: UserService
  ) {}
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

  onFileSelected(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0]; // Select the first file
    }
  }
  uploadProfileFile() {
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
          console.log('File uploaded successfully:', res.file.url);
          this.onUpdate();
        },
        error: (error: any) => {
          console.error('File upload failed:', error);
        },
      });
  }

  onUpdate() {
    this.userService.updateUser(this.user._id, this.updatedUser).subscribe({
      next: (res: any) => {
        console.log('User updated successfully:', res);
        this.selectedFile = null;
        this.isLoaded = false;
      },
      error: (error: any) => {
        console.error('User update failed:', error);
        alert('User update failed!');
        this.isLoaded = false;
      },
    });
  }

  onClose() {
    this.getUpdatedUserData.emit();
  }
}
