import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AlertService } from '../../../services/alert/alert.service';

export const profileGuard: CanActivateFn = () => {
  const cookieService = inject(CookieService);
  const router = inject(Router);
  const alertService = inject(AlertService)

  const token = cookieService.get('token');
  if (token) {
    router.navigate(['/user/profile'])
    return true;
  } else {
    router.navigate(['/auth/login']);
    return false;
  }
};
