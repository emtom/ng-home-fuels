import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class ToastComponent {
  private toastService = inject(ToastService);

  get toasts() {
    return this.toastService.toasts$();
  }

  removeToast(id: string) {
    this.toastService.remove(id);
  }

  getToastClasses(type: string): string {
    const baseClasses = 'flex items-center p-4 rounded-lg shadow-lg max-w-sm w-full transform transition-all duration-300 ease-in-out animate-slide-up';
    
    switch (type) {
      case 'success':
        return `${baseClasses} bg-green-500 text-white`;
      case 'warning':
        return `${baseClasses} bg-orange-500 text-white`;
      case 'error':
        return `${baseClasses} bg-red-500 text-white`;
      case 'default':
      default:
        return `${baseClasses} bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700`;
    }
  }

  getIcon(type: string): string {
    switch (type) {
      case 'success':
        return '✓';
      case 'warning':
        return '⚠';
      case 'error':
        return '✕';
      case 'default':
      default:
        return 'ℹ';
    }
  }
}
