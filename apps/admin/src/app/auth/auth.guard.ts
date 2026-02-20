import { CanActivateFn, Router } from '@angular/router';
import { effect, inject } from '@angular/core';
import { Auth } from './auth.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const auth = inject(Auth);
  const router = inject(Router);
  const { data: { session }, error } = await auth.supabase.auth.getSession();
  if (session) return true;
  return router.createUrlTree(['/login']);
};
