import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AlertService } from '../../../services/alert/alert.service';

export const profileGuard: CanActivateFn = () => {
  const cookieService = inject(CookieService);
  const alertService = inject(AlertService)

  const router = inject(Router);
  const token = cookieService.get('accessToken');
  if (token) {
    return true;
  } else {
    router.navigate(['/auth/login']);
    return false;
  }
};
