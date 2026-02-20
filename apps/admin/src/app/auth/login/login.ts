import { Component, inject } from '@angular/core';
import { Auth } from '../auth.service';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private readonly auth = inject(Auth);

  signInWithOAuth(provider: 'github' | 'google') {
    this.auth.signInWithGithub();
  }
}
