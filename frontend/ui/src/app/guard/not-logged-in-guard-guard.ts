import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';

export const notLoggedInGuard: CanActivateFn = (route, state) => {
const authService = inject(AuthService);
  const router = inject(Router);
  
  if (!authService.isAuthenticated()) {
    return true;
  }

  const role = authService.getUserRole();
    if (role === 'customer') {
      router.navigate(['/reservation']);
    } else if (role === 'admin') {
      router.navigate(['/admin-dashboard']);
    }

  return false;
};
