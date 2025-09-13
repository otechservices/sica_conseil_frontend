import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationService } from '../../services/navigation.service';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
})
export class ContactComponent implements OnInit {
  isMenuOpen = false;
  contactForm: FormGroup = new FormGroup({});

  contactInfo = [
    { icon: 'ri-phone-line', title: 'Téléphone', value: '+33 1 23 45 67 89', description: 'Lun-Ven: 9h-18h' },
    { icon: 'ri-mail-line', title: 'Email', value: 'contact@sica-conseil.fr', description: 'Réponse sous 24h' },
    { icon: 'ri-map-pin-line', title: 'Adresse', value: '123 Avenue des Champs-Élysées', description: '75008 Paris, France' },
    { icon: 'ri-time-line', title: 'Horaires', value: 'Lundi - Vendredi', description: '9h00 - 18h00' }
  ];

  services = [
    { value: 'conseil', label: 'Conseil en Management' }, { value: 'formation', label: 'Formation PMP' },
    { value: 'audit', label: 'Audit & Optimisation' }, { value: 'coaching', label: 'Coaching Individuel' },
    { value: 'digital', label: 'Transformation Digitale' }, { value: 'autre', label: 'Autre demande' }
  ];

  faqs = [
    { question: 'Combien coûte une formation PMP ?', answer: 'Nos formations PMP sont accessibles dès 1€ pour l\'ensemble du programme complet incluant les tests blancs et le support personnalisé.' },
    { question: 'Quelle est la durée moyenne d\'une mission de conseil ?', answer: 'La durée varie selon la complexité du projet, généralement entre 1 et 6 mois. Nous proposons une évaluation gratuite pour estimer précisément vos besoins.' },
    { question: 'Proposez-vous des formations en entreprise ?', answer: 'Oui, nous proposons des formations sur mesure adaptées aux besoins spécifiques de votre organisation, directement dans vos locaux ou en distanciel.' },
    { question: 'Comment obtenir un devis personnalisé ?', answer: 'Utilisez notre formulaire de contact en précisant vos besoins, ou appelez-nous directement. Nous vous proposerons un devis gratuit sous 48h.' }
  ];

  constructor(
    private fb: FormBuilder,
    private navigationService: NavigationService,
    private seoService: SeoService
  ) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      company: [''],
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.maxLength(500)]],
      service: ['conseil', Validators.required]
    });

    this.seoService.setPageMetadata(
      "Contactez-nous - SICA CONSEIL | Gestion de Projet et Formation",
      "Contactez SICA CONSEIL pour vos projets de gestion, formations PMP, conseil en transformation. Consultation gratuite. +33 1 23 45 67 89"
    );
    this.seoService.generateWebPageSchema(
      "Contactez-nous - SICA CONSEIL",
      "Contactez SICA CONSEIL pour vos projets de gestion, formations PMP, conseil en transformation. Consultation gratuite. +33 1 23 45 67 89",
      "/contact"
    );
    this.seoService.generateBreadcrumbSchema([
      { name: "Accueil", url: "/" },
      { name: "Contact", url: "/contact" }
    ]);
  }

  handleSubmit() {
    if (this.contactForm.valid) {
      console.log('Formulaire envoyé:', this.contactForm.value);
      alert('Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.');
      this.contactForm.reset();
    }
  }

  navigate(path: string) {
    this.navigationService.navigate(path);
  }
}
