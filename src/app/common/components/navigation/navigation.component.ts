import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private themeService = inject(ThemeService);
  
  // Auth state
  user = this.authService.user;
  isAuthenticated = this.authService.isAuthenticated;

  isDarkModeComputed = computed(() => {
    const theme = this.themeService.theme();
    return theme === 'dark';
  });

  isAvatarMenuOpen = false;

  isMobileMenuOpen = false;

  userInitials = computed(() => {
    const currentUser = this.user();
    if (!currentUser) return 'U';
    
    if (currentUser.displayName) {
      return currentUser.displayName
        .split(' ')
        .map(name => name.charAt(0))
        .join('')
        .toUpperCase()
        .slice(0, 2);
    }
    
    return currentUser.email?.charAt(0).toUpperCase() || 'U';
  });

  toggleDarkMode() {
    this.themeService.toggleTheme();
  }

  toggleAvatarMenu() {
    this.isAvatarMenuOpen = !this.isAvatarMenuOpen;
  }

  closeAvatarMenu() {
    this.isAvatarMenuOpen = false;
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }

  async logout() {
    try {
      await this.authService.logout();
      this.closeAvatarMenu();
      await this.router.navigate(['/auth/login']);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }
} 