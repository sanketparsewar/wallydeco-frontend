import { UserService } from './../../../services/user/user.service';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UploadService } from '../../../services/fileUpload/upload.service';

@Component({
  selector: 'app-edit-profile',
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css',
})
export class EditProfileComponent {
  @Input() user: any = {
    name: '',
    image: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zip: '',
    },
  };
  isLoaded: boolean = false;
  selectedFile!: File;

  constructor(
    private uploadService: UploadService,
    private userService: UserService
  ) {}

  onFileSelected(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0]; // Select the first file
    }
    this.uploadService.uploadFile(this.selectedFile).subscribe({
      next: (res: any) => {
        this.user.image = res.file.url;
        console.log('File uploaded successfully:', res.file.url);
      },
      error: (error: any) => {
        console.error('File upload failed:', error);
      },
    });
  }

  onUpdate() {
    this.isLoaded=false
    console.log('updated user', this.user);
    this.userService.updateUser(this.user).subscribe({
      next: (res: any) => {
        console.log('User updated successfully:', res);
        this.isLoaded=true;
      },
      error: (error: any) => {
        console.error('User update failed:', error);
        alert('User update failed!');
        this.isLoaded=true;
      },
    });
  }
}
