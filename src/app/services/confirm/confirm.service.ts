import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root',
})
export class ConfirmService {
  constructor() {}

  showConfirm(message: string): Promise<boolean> {
    return Swal.fire({
      text: `Are you sure you want to ${message}?`,
      // text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel',
    }).then((result) => result.isConfirmed);
  }
}
