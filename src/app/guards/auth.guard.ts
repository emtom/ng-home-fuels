import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isLoading = authService.isLoading();
  const isAuthenticated = authService.isAuthenticated();

  if (isLoading) {
    return false;
  }

  if (!isAuthenticated) {
    router.navigateByUrl('/login');
    return false;
  }

  return true;
};