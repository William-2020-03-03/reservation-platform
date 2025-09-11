import { Routes } from '@angular/router';
import { authGuard } from './guard/auth-guard';
import { roleGuard } from './guard/role-guard';
import { notLoggedInGuard } from './guard/not-logged-in-guard-guard';

export const routes: Routes = [
  {
    path: 'login',
    canActivate: [notLoggedInGuard],
    loadComponent: () =>
      import('./components/login-page/login-page').then(m => m.LoginPage),
  },
  {
    path: 'register',
    canActivate: [notLoggedInGuard],
    loadComponent: () => {
      return import('./components/register-page/register-page').then(m => m.RegisterPage);
    },
  },
  {
    path: 'amdin/users',
    canActivate: [authGuard, roleGuard],
    loadComponent: () => {
      return import('./components/admin-user-list-component/admin-user-list-component').then(m => m.AdminUserListComponent);
    },
  },
  {
    path: 'reservation',
    canActivate: [authGuard, roleGuard],
    data: { role: 'customer' },
    loadComponent: () =>
      import('./components/reservation-component/reservation-component').then(m => m.ReservationComponent),
  },
  {
    path: 'employee/reservations',
    canActivate: [authGuard, roleGuard],
    data: { role: 'employee' },
    loadComponent: () => {
      return import('./components/employee-reservations-component/employee-reservations-component').then(m => m.EmployeeReservationsComponent);
    },
  },
  {
    path: 'admin-dashboard',
    canActivate: [authGuard, roleGuard],
    data: { role: 'admin' },
    loadChildren: () => import('./modules/admin/admin-module').then(m => m.AdminModule)
  },
  { path: '**', redirectTo: 'login' }
];
