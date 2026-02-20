import { Injectable, signal } from '@angular/core';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/supabase';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly user = signal<User | null>(null);
  readonly session = signal<Session | null>(null);


  constructor(){
    supabase.auth.getSession().then(({ data: { session } }) => {
      this.session.set(session);
      this.user.set(session?.user ?? null);
    });

    supabase.auth.onAuthStateChange((event, session) => {
      this.session.set(session);
      this.user.set(session?.user ?? null);
    });
  }

  // constructor() {
  //   this.supabase.auth.onAuthStateChange((event, session) => {
  //     console.log('Auth state changed:', event, session);
  //     this.session.set(session);
  //     this.user.set(session?.user ?? null);
  //   });
  // }

  async signInWithGithub() {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${window.location.origin}/dashboard`
      }
    });
  }

  async signOut() {
    await supabase.auth.signOut();
  }
}
