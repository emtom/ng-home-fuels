import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

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
  
  // Auth state
  user = this.authService.user;
  isAuthenticated = this.authService.isAuthenticated;

  // Dark mode state
  isDarkMode = false;

  // Avatar menu state
  isAvatarMenuOpen = false;

  // Mobile menu state
  isMobileMenuOpen = false;

  // Computed user initials
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
    this.isDarkMode = !this.isDarkMode;
    // TODO: Implement actual dark mode functionality
    // This could involve updating CSS classes or using a theme service
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