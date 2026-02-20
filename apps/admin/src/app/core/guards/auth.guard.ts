import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = async (route, state) => {
  // const supabase = inject(Supabase);
  // const router = inject(Router);
  // const { data: { session }, error } = await auth.supabase.auth.getSession();
  // if (session) return true;
  // return router.createUrlTree(['/login']);
  return true;
};
