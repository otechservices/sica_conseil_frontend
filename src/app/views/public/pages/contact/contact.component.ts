import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationService } from '../../../../core/services/navigation.service';
import { PublicContentService } from '../../../../core/services/public-content.service';
import { SeoService } from '../../../../core/services/seo.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup = new FormGroup({});
  contactInfo: any[] = [];
  faqs: any[] = [];

  // Options du formulaire — rarement changées
  services = [
    { value: 'conseil',   label: 'Conseil en Management' },
    { value: 'formation', label: 'Formation PMP' },
    { value: 'audit',     label: 'Audit & Optimisation' },
    { value: 'coaching',  label: 'Coaching Individuel' },
    { value: 'digital',   label: 'Transformation Digitale' },
    { value: 'autre',     label: 'Autre demande' },
  ];

  constructor(
    private fb: FormBuilder,
    private navigationService: NavigationService,
    private seoService: SeoService,
    private publicContent: PublicContentService
  ) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName:  ['', Validators.required],
      email:     ['', [Validators.required, Validators.email]],
      phone:     [''],
      company:   [''],
      subject:   ['', Validators.required],
      message:   ['', [Validators.required, Validators.maxLength(500)]],
      service:   ['conseil', Validators.required],
    });

    this.seoService.setPageMetadata(
      'Contactez-nous - Sica Conseil Int | Gestion de Projet et Formation',
      'Contactez Sica Conseil Int pour vos projets de gestion, formations PMP, conseil en transformation. Consultation gratuite.'
    );
    this.seoService.generateWebPageSchema(
      'Contactez-nous - Sica Conseil Int',
      'Contactez Sica Conseil Int pour vos projets de gestion, formations PMP, conseil en transformation. Consultation gratuite.',
      '/contact'
    );
    this.seoService.generateBreadcrumbSchema([
      { name: 'Accueil', url: '/' },
      { name: 'Contact',  url: '/contact' }
    ]);

    this.publicContent.getContactInfo().subscribe({
      next: (res) => { this.contactInfo = res.data ?? []; }
    });

    this.publicContent.getFaqs('contact').subscribe({
      next: (res) => { this.faqs = res.data ?? []; }
    });
  }

  handleSubmit(): void {
    if (this.contactForm.valid) {
      console.log('Formulaire envoyé:', this.contactForm.value);
      alert('Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.');
      this.contactForm.reset({ service: 'conseil' });
    }
  }

  navigate(path: string): void {
    this.navigationService.navigate(path);
  }
}
