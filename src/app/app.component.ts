import { Component, computed, effect, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  readonly isLoading = computed(() => this.authService.isLoading());

  constructor() {
    effect(() => {
      if (this.authService.isLoading()) {
        return;
      }

      const target = this.authService.isAuthenticated() ? '/dashboard' : '/auth/login';
      this.router.navigateByUrl(target);
    });
  }
}
