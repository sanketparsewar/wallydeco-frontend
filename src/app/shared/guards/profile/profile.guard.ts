import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AlertService } from "../../../services/alert/alert.service";

export const profileGuard: CanActivateFn = () => {
  const alertService = inject(AlertService);
  const router = inject(Router);
  const token = localStorage.getItem('accessToken'); // No need for JSON.parse

  if (!token) {
    router.navigate(['/auth/login']);
    return false;
  }

  return true;
};
