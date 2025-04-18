import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { AlertService } from '../alert/alert.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router)
  const authService = inject(AuthService);
  const alertService = inject(AlertService);
  const token = localStorage.getItem('accessToken');

  // ⛔ Skip token attach for login or refresh endpoints (optional)
  const excludedUrls = ['/auth/login', '/auth/refresh'];
  const isExcluded = excludedUrls.some(url => req.url.includes(url));

  // ➕ Clone request to add Authorization header if not excluded
  const authReq = !isExcluded && token
    ? req.clone({
        setHeaders: {
          Authorization: token, // Already prefixed with "Bearer "
        },
      })
    : req;

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        console.warn('401 Unauthorized - Attempting Token Refresh');

        return authService.refreshToken().pipe(
          switchMap(() => {
            const newToken = localStorage.getItem('accessToken');
            const retriedReq = req.clone({
              setHeaders: {
                Authorization: newToken || '',
              },
            });
            return next(retriedReq);
          }),
          catchError((refreshError) => {
            // authService.logout().subscribe({
            //   next: () => router.navigate(['auth', 'login']),
            //   error: (err) => alertService.showError(err.error?.message),
            // });
            localStorage.removeItem('accessToken');
            return throwError(() => refreshError);
          })
        );
      }

      return throwError(() => error);
    })
  );
};
