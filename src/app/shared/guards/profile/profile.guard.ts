import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const profileGuard: CanActivateFn = (route, state) => {
   // TODO: Implement authentication logic here. For now, always allow access.
    const router=inject(Router)
    const token = localStorage.getItem('token');
    if(token){
      return true;
    }
    else{
      router.navigateByUrl('auth/login')
      return false;
    }
};
