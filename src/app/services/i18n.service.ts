import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { tap } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class I18nService {
  private translations = new BehaviorSubject<any>({});
  public translations$ = this.translations.asObservable();
  private currentLang: string = 'fr';

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  public async init(defaultLang: string = 'fr'): Promise<void> {
    if (isPlatformBrowser(this.platformId)) {
      this.currentLang = localStorage.getItem('user-lang') || defaultLang;
    } else {
      this.currentLang = defaultLang;
    }
    await this.loadTranslations(this.currentLang);
  }

  public async setLanguage(lang: string): Promise<void> {
    this.currentLang = lang;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('user-lang', lang);
    }
    await this.loadTranslations(lang);
  }

  private async loadTranslations(lang: string): Promise<void> {
    const translations = await firstValueFrom(
      this.http.get(`/assets/i18n/${lang}.json`).pipe(
        tap(t => this.translations.next(t))
      )
    );
  }

  public translate(key: string): string {
    const keys = key.split('.');
    let result = this.translations.getValue();
    for (const k of keys) {
      if (result[k] === undefined || result[k] === null) {
        return key; // fallback: return key if not found
      }
      result = result[k];
    }
    return result;
  }
}
