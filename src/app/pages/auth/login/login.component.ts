import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  styleUrl: './login.component.scss',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  loginForm: FormGroup;

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(24)]]
    });
  }

  async loginWithEmail() {
    if (this.loginForm.valid) {
      try {
        const { email, password } = this.loginForm.value;
        // TODO: Implement email/password login with Firebase
        console.log('Email login:', { email, password });
        // For now, just navigate to dashboard
        await this.router.navigate(['/dashboard']);
      } catch (error) {
        console.error('Email login failed:', error);
      }
    } else {
      this.markFormGroupTouched();
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

  // Helper method to mark all form controls as touched
  private markFormGroupTouched() {
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      control?.markAsTouched();
    });
  }

  // Helper methods for template
  get emailControl() {
    return this.loginForm.get('email');
  }

  get passwordControl() {
    return this.loginForm.get('password');
  }

  get isFormValid() {
    return this.loginForm.valid;
  }
} 