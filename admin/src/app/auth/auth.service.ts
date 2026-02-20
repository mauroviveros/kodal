import { Injectable, signal } from '@angular/core';
import { User, createClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  readonly user = signal<User | null>(null);
  readonly supabase = createClient(
    environment.SUPABASE_URL,
    environment.SUPABASE_PUBLISHABLE_KEY
  );

  async signInWithGithub() {
    await this.supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${window.location.origin}/dashboard`
      }
    });

  }

  async signOut() {
    await this.supabase.auth.signOut();
  }
}
