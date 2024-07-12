import { AuthService } from './auth.service';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {

  const  authService  =  inject(AuthService);
const  router  =  inject(Router);

if (authService.isLoggedIn()) {
  return true;
}
router.navigate(['/login']);
return false;
  
};