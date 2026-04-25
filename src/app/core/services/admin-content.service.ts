import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../utils/config-service';

@Injectable({ providedIn: 'root' })
export class AdminContentService {

  private base = ConfigService.toApiUrl('admin/');

  constructor(private http: HttpClient) {}

  // Services
  getServices(params?: any) { return this.http.get<any>(`${this.base}services`); }
  createService(data: any) { return this.http.post<any>(`${this.base}services`, data); }
  updateService(id: number, data: any) { return this.http.put<any>(`${this.base}services/${id}`, data); }
  deleteService(id: number) { return this.http.delete<any>(`${this.base}services/${id}`); }
  toggleService(id: number, state: 0 | 1) { return this.http.get<any>(`${this.base}services/${id}/state/${state}`); }

  // Formations
  getFormations(params?: any) { return this.http.get<any>(`${this.base}formations`); }
  createFormation(data: any) { return this.http.post<any>(`${this.base}formations`, data); }
  updateFormation(id: number, data: any) { return this.http.put<any>(`${this.base}formations/${id}`, data); }
  deleteFormation(id: number) { return this.http.delete<any>(`${this.base}formations/${id}`); }
  toggleFormation(id: number, state: 0 | 1) { return this.http.get<any>(`${this.base}formations/${id}/state/${state}`); }

  // Testimonials
  getTestimonials() { return this.http.get<any>(`${this.base}testimonials`); }
  createTestimonial(data: any) { return this.http.post<any>(`${this.base}testimonials`, data); }
  updateTestimonial(id: number, data: any) { return this.http.put<any>(`${this.base}testimonials/${id}`, data); }
  deleteTestimonial(id: number) { return this.http.delete<any>(`${this.base}testimonials/${id}`); }
  toggleTestimonial(id: number, state: 0 | 1) { return this.http.get<any>(`${this.base}testimonials/${id}/state/${state}`); }

  // Team members
  getTeamMembers() { return this.http.get<any>(`${this.base}team-members`); }
  createTeamMember(data: any) { return this.http.post<any>(`${this.base}team-members`, data); }
  updateTeamMember(id: number, data: any) { return this.http.put<any>(`${this.base}team-members/${id}`, data); }
  deleteTeamMember(id: number) { return this.http.delete<any>(`${this.base}team-members/${id}`); }
  toggleTeamMember(id: number, state: 0 | 1) { return this.http.get<any>(`${this.base}team-members/${id}/state/${state}`); }

  // FAQs
  getFaqs() { return this.http.get<any>(`${this.base}faqs`); }
  createFaq(data: any) { return this.http.post<any>(`${this.base}faqs`, data); }
  updateFaq(id: number, data: any) { return this.http.put<any>(`${this.base}faqs/${id}`, data); }
  deleteFaq(id: number) { return this.http.delete<any>(`${this.base}faqs/${id}`); }
  toggleFaq(id: number, state: 0 | 1) { return this.http.get<any>(`${this.base}faqs/${id}/state/${state}`); }

  // Contact infos
  getContactInfos() { return this.http.get<any>(`${this.base}contact-infos`); }
  createContactInfo(data: any) { return this.http.post<any>(`${this.base}contact-infos`, data); }
  updateContactInfo(id: number, data: any) { return this.http.put<any>(`${this.base}contact-infos/${id}`, data); }
  deleteContactInfo(id: number) { return this.http.delete<any>(`${this.base}contact-infos/${id}`); }
  toggleContactInfo(id: number, state: 0 | 1) { return this.http.get<any>(`${this.base}contact-infos/${id}/state/${state}`); }

  // Page contents
  getPageContents() { return this.http.get<any>(`${this.base}page-contents`); }
  createPageContent(data: any) { return this.http.post<any>(`${this.base}page-contents`, data); }
  updatePageContent(id: number, data: any) { return this.http.put<any>(`${this.base}page-contents/${id}`, data); }
  deletePageContent(id: number) { return this.http.delete<any>(`${this.base}page-contents/${id}`); }
  bulkUpdatePageContents(items: any[]) { return this.http.post<any>(`${this.base}page-contents/bulk-update`, { items }); }
}
