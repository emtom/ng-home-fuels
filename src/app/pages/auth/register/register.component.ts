import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private toastService = inject(ToastService);

  registerForm: FormGroup;

  constructor() {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(24)]],
      confirmPassword: ['', [Validators.required]],
      acceptTerms: [false, [Validators.requiredTrue]]
    }, { validators: this.passwordMatchValidator });
  }

  // Custom validator to check if passwords match
  private passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { passwordMismatch: true };
    }
    
    return null;
  }

  async registerWithEmail() {
    if (this.registerForm.valid) {
      try {
        const { name, email, password } = this.registerForm.value;
        await this.authService.registerWithEmail(email, password, name);
        this.toastService.success('Konto zostało utworzone pomyślnie!');
        await this.router.navigate(['/auth/login']);
      } catch (error: any) {
        console.error('Email registration failed:', error);
        this.toastService.error(`Błąd rejestracji: ${error.message || 'Nieznany błąd'}`);
      }
    } else {
      this.markFormGroupTouched();
      this.toastService.warning('Proszę poprawić błędy w formularzu');
    }
  }

  async registerWithGoogle() {
    try {
      await this.authService.loginWithGoogle();
      this.toastService.success('Zalogowano przez Google!');
      await this.router.navigate(['/dashboard']);
    } catch (error: any) {
      console.error('Google registration failed:', error);
      this.toastService.error(`Błąd logowania przez Google: ${error.message || 'Nieznany błąd'}`);
    }
  }

  async registerWithFacebook() {
    try {
      await this.authService.loginWithFacebook();
      this.toastService.success('Zalogowano przez Facebook!');
      await this.router.navigate(['/dashboard']);
    } catch (error: any) {
      console.error('Facebook registration failed:', error);
      this.toastService.error(`Błąd logowania przez Facebook: ${error.message || 'Nieznany błąd'}`);
    }
  }

  // Helper method to mark all form controls as touched
  private markFormGroupTouched() {
    Object.keys(this.registerForm.controls).forEach(key => {
      const control = this.registerForm.get(key);
      control?.markAsTouched();
    });
  }

  // Helper methods for template
  get nameControl() {
    return this.registerForm.get('name');
  }

  get emailControl() {
    return this.registerForm.get('email');
  }

  get passwordControl() {
    return this.registerForm.get('password');
  }

  get confirmPasswordControl() {
    return this.registerForm.get('confirmPassword');
  }

  get acceptTermsControl() {
    return this.registerForm.get('acceptTerms');
  }

  get isFormValid() {
    return this.registerForm.valid;
  }

  get hasPasswordMismatch() {
    return this.registerForm.errors?.['passwordMismatch'] && this.confirmPasswordControl?.touched;
  }
}
