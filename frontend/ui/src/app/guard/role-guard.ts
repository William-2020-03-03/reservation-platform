import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { inject } from '@angular/core';

export const roleGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const expectedRole = route.data?.['role'];
  const userRole = auth.getUserRole();
  if (expectedRole && userRole !== expectedRole) {
    router.navigate(['/unauthorized']);
    return false;
  }

  return true;
};
