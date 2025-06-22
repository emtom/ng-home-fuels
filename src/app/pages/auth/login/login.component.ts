import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  styleUrls: ['./login.component.scss'],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  email: string = '';
  password: string = '';

  async loginWithEmail() {
    try {
      // TODO: Implement email/password login with Firebase
      console.log('Email login:', this.email, this.password);
      // For now, just navigate to dashboard
      await this.router.navigate(['/dashboard']);
    } catch (error) {
      console.error('Email login failed:', error);
    }
  }

  async loginWithGoogle() {
    try {
      await this.authService.loginWithGoogle();
      await this.router.navigate(['/dashboard']);
    } catch (error) {
      console.error('Google login failed:', error);
    }
  }

  async loginWithFacebook() {
    try {
      await this.authService.loginWithFacebook();
      await this.router.navigate(['/dashboard']);
    } catch (error) {
      console.error('Facebook login failed:', error);
    }
  }
} 