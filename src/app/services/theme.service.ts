import { Injectable, WritableSignal, signal } from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_KEY = 'theme';
  private readonly DEFAULT_THEME: Theme = 'light';

  private _theme: WritableSignal<Theme> = signal(this.getStoredTheme());
  
  get theme() {
    return this._theme.asReadonly();
  }

  get isDarkMode() {
    return this._theme() === 'dark';
  }

  constructor() {
    this.applyTheme(this._theme());
  }

  toggleTheme() {
    const currentTheme = this._theme();
    const newTheme: Theme = currentTheme === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  }

  /**
   * TODO simplify this
   */
  setTheme(theme: Theme) {
    this._theme.set(theme);
    this.storeTheme(theme);
    this.applyTheme(theme);
  }

  private getStoredTheme(): Theme {
    if (typeof window === 'undefined') return this.DEFAULT_THEME;
    
    const stored = localStorage.getItem(this.THEME_KEY);
    return (stored as Theme) || this.DEFAULT_THEME;
  }

  private storeTheme(theme: Theme) {
    if (typeof window === 'undefined') return;
    localStorage.setItem(this.THEME_KEY, theme);
  }

  private applyTheme(theme: Theme) {
    if (typeof document === 'undefined') return;
    
    const html = document.documentElement;
    
    if (theme === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }
} 