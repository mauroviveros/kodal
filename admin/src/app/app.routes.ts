import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  {
    path: 'dashboard',
    title: 'Kodal - Dashboard',
    canActivate: [authGuard],
    loadComponent: () => import('./dashboard/dashboard').then(m => m.Dashboard),
    children: [
      {
        path: '',
        loadComponent: () => import('./dashboard/pages/overview/overview').then(m => m.Overview)
      },
      {
        path: 'medals',
        loadComponent: () => import('./dashboard/pages/medals/medals').then(m => m.DashboardMedals)
      },
      {
        path: '**',
        redirectTo: 'dashboard'
      }
    ]
  },
  {
    path: 'login',
    loadComponent: () => import('./auth/login/login').then(m => m.Login)
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];
