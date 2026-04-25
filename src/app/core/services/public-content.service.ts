import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../utils/config-service';

@Injectable({ providedIn: 'root' })
export class PublicContentService {

  private base = ConfigService.toApiUrl('public/');

  constructor(private http: HttpClient) {}

  getServices(context: 'service' | 'domain' | 'secteur' = 'service') {
    return this.http.get<any>(`${this.base}services?context=${context}`);
  }

  getFormations(category?: string) {
    const params = category ? `?category=${encodeURIComponent(category)}` : '';
    return this.http.get<any>(`${this.base}formations${params}`);
  }

  getFormationCategories() {
    return this.http.get<any>(`${this.base}formations/categories`);
  }

  getTestimonials() {
    return this.http.get<any>(`${this.base}testimonials`);
  }

  getTeam() {
    return this.http.get<any>(`${this.base}team`);
  }

  getFaqs(pageName?: string) {
    const params = pageName ? `?page_name=${pageName}` : '';
    return this.http.get<any>(`${this.base}faqs${params}`);
  }

  getContactInfo() {
    return this.http.get<any>(`${this.base}contact-info`);
  }

  getPageContent(page: string) {
    return this.http.get<any>(`${this.base}page-content/${page}`);
  }
}
