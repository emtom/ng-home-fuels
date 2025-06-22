import { Injectable, signal, WritableSignal } from '@angular/core';

export interface Toast {
  id: string;
  message: string;
  type: 'default' | 'warning' | 'error' | 'success';
  duration?: number;
  timestamp: number;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toasts: WritableSignal<Toast[]> = signal([]);

  get toasts$() {
    return this.toasts.asReadonly();
  }

  show(message: string, type: Toast['type'] = 'default', duration: number = 5000) {
    const toast: Toast = {
      id: this.generateId(),
      message,
      type,
      duration,
      timestamp: Date.now()
    };

    this.toasts.update(toasts => [...toasts, toast]);

    if (duration > 0) {
      setTimeout(() => {
        this.remove(toast.id);
      }, duration);
    }

    return toast.id;
  }

  success(message: string, duration?: number) {
    return this.show(message, 'success', duration);
  }

  warning(message: string, duration?: number) {
    return this.show(message, 'warning', duration);
  }

  error(message: string, duration?: number) {
    return this.show(message, 'error', duration);
  }

  default(message: string, duration?: number) {
    return this.show(message, 'default', duration);
  }

  remove(id: string) {
    this.toasts.update(toasts => toasts.filter(toast => toast.id !== id));
  }

  clear() {
    this.toasts.set([]);
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }
}
