import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {
  private authService = inject(AuthService);
  
  readonly user = this.authService.user;
  readonly isAuthenticated = this.authService.isAuthenticated;

  async logout() {
    await this.authService.logout();
  }
} 