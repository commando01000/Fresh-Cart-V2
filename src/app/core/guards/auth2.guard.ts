import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const auth2Guard: CanActivateFn = (route, state) => {
  let _router = inject(Router);
  if (localStorage.getItem('token') != null) {
    _router.navigate(['home']);
    return false;
  }
  return true;
};
