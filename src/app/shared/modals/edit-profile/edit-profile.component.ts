import { UserService } from './../../../services/user/user.service';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UploadService } from '../../../services/fileUpload/upload.service';
@Component({
  selector: 'app-edit-profile',
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css',
})
export class EditProfileComponent implements OnInit {
  @Input() user: any = {}
  // @Input() user: any = {
  //   name: '',
  //   image: '',
  //   email: '',
  //   phone: '',
  //   address: {
  //     street: '',
  //     city: '',
  //     state: '',
  //     zip: '',
  //   },
  //   gender: '',
  // };
  updatedUser: any;

  isLoaded: boolean = false;
  selectedFile!: File;

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
      },
      error: (error: any) => {
        console.error('User update failed:', error);
        alert('User update failed!');
      },
    });
  }

  onSubmit() {
    // this.isLoaded = true;
    this.onUpdate();
  }
  
}
