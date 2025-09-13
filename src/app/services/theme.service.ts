import { Injectable, Renderer2, RendererFactory2, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private renderer: Renderer2;
  private colorTheme: 'light' | 'dark' = 'light';
  private isBrowser: boolean;

  constructor(
    rendererFactory: RendererFactory2,
    @Inject(PLATFORM_ID) private platformId: object,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  initTheme() {
    if (this.isBrowser) {
      this.colorTheme =
        (localStorage.getItem('user-theme') as 'light' | 'dark') ||
        this.getSystemTheme();
      this.updateTheme(this.colorTheme);
    }
  }

  private getSystemTheme(): 'light' | 'dark' {
    if (!this.isBrowser) return 'light'; // fallback côté serveur
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }

  private updateTheme(theme: 'light' | 'dark') {
    this.colorTheme = theme;

    if (this.isBrowser) {
      localStorage.setItem('user-theme', theme);

      if (theme === 'dark') {
        this.renderer.addClass(this.document.documentElement, 'dark');
      } else {
        this.renderer.removeClass(this.document.documentElement, 'dark');
      }
    }
  }

  toggleTheme() {
    const newTheme = this.colorTheme === 'dark' ? 'light' : 'dark';
    this.updateTheme(newTheme);
  }

  isDarkMode(): boolean {
    return this.colorTheme === 'dark';
  }
}
