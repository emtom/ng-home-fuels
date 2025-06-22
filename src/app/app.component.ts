import { Component, computed, effect, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { ThemeService } from './services/theme.service';
import { ToastComponent } from './common/components/toast/toast.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private authService = inject(AuthService);
  private themeService = inject(ThemeService);
  private router = inject(Router);

  readonly isLoading = computed(() => this.authService.isLoading());

  constructor() {
    this.themeService.theme();
    
    effect(() => {
      if (this.authService.isLoading()) {
        return;
      }

      const target = this.authService.isAuthenticated() ? '/dashboard' : '/auth/login';
      this.router.navigateByUrl(target);
    });
  }
}
