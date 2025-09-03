import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, ButtonModule, CardModule],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
      <!-- Header -->
      <nav class="bg-white shadow-sm border-b border-gray-100">
        <div class="container-fluid">
          <div class="row align-items-center py-3">
            <div class="col-md-6">
              <div class="d-flex align-items-center">
                <div class="bg-warning rounded-3 p-2 me-3">
                  <span class="text-white fw-bold fs-5">SC</span>
                </div>
                <h1 class="h4 mb-0 fw-bold text-dark">SICA CONSEIL</h1>
              </div>
            </div>
            <div class="col-md-6 text-end">
              <p-button 
                label="Se connecter" 
                [outlined]="true"
                severity="secondary"
                size="small"
                class="me-2"
                (onClick)="navigateToAuth()">
              </p-button>
              <p-button 
                label="S'inscrire" 
                severity="warning"
                size="small"
                (onClick)="navigateToAuth()">
              </p-button>
            </div>
          </div>
        </div>
      </nav>

      <!-- Hero Section -->
      <div class="container-fluid py-5">
        <div class="row justify-content-center">
          <div class="col-lg-8 text-center">
            <h1 class="display-4 fw-bold text-dark mb-4">
              Votre plateforme complète pour la 
              <span class="text-warning">certification PMP</span>
            </h1>
            <p class="lead text-muted mb-5">
              Préparez-vous efficacement avec des questions authentiques du PMI Institute, 
              des simulateurs d'examen et une formation complète
            </p>
            
            <div class="d-flex flex-column flex-sm-row gap-3 justify-content-center">
              <p-button 
                label="Commencer gratuitement" 
                severity="warning"
                size="large"
                icon="pi pi-arrow-right"
                iconPos="right"
                (onClick)="navigateToAuth()">
              </p-button>
              <p-button 
                label="Découvrir la formation" 
                [outlined]="true"
                severity="secondary"
                size="large"
                icon="pi pi-play"
                (onClick)="navigateToAuth()">
              </p-button>
            </div>
          </div>
        </div>
      </div>

      <!-- Features Section -->
      <div class="bg-white py-5">
        <div class="container-fluid">
          <div class="row justify-content-center mb-5">
            <div class="col-lg-8 text-center">
              <h2 class="h1 fw-bold text-dark mb-3">
                Tout ce dont vous avez besoin pour réussir
              </h2>
              <p class="text-muted">
                Une approche complète et structurée pour votre certification PMP
              </p>
            </div>
          </div>
          
          <div class="row g-4">
            <div class="col-md-4">
              <p-card class="h-100 text-center border-0 shadow-sm">
                <div class="bg-warning bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style="width: 80px; height: 80px;">
                  <i class="pi pi-book text-warning" style="font-size: 2rem;"></i>
                </div>
                <h3 class="h5 fw-semibold text-dark mb-3">Formation PMP</h3>
                <p class="text-muted">
                  Modules de formation complets couvrant tous les domaines du PMP
                </p>
              </p-card>
            </div>
            
            <div class="col-md-4">
              <p-card class="h-100 text-center border-0 shadow-sm">
                <div class="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style="width: 80px; height: 80px;">
                  <i class="pi pi-calculator text-primary" style="font-size: 2rem;"></i>
                </div>
                <h3 class="h5 fw-semibold text-dark mb-3">Simulateur PMP</h3>
                <p class="text-muted">
                  Tests authentiques avec questions du PMI Institute
                </p>
              </p-card>
            </div>
            
            <div class="col-md-4">
              <p-card class="h-100 text-center border-0 shadow-sm">
                <div class="bg-success bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style="width: 80px; height: 80px;">
                  <i class="pi pi-folder text-success" style="font-size: 2rem;"></i>
                </div>
                <h3 class="h5 fw-semibold text-dark mb-3">Générateur de projets</h3>
                <p class="text-muted">
                  Créez et gérez vos projets avec les meilleures pratiques
                </p>
              </p-card>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA Section -->
      <div class="bg-gradient-to-r from-orange-500 to-amber-500 py-5" style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);">
        <div class="container-fluid text-center">
          <div class="row justify-content-center">
            <div class="col-lg-8">
              <h2 class="h1 fw-bold text-white mb-3">
                Prêt à commencer votre certification PMP ?
              </h2>
              <p class="text-white opacity-75 mb-4 fs-5">
                Rejoignez des milliers de professionnels qui ont réussi avec SICA CONSEIL
              </p>
              <p-button 
                label="Commencer maintenant" 
                severity="secondary"
                size="large"
                (onClick)="navigateToAuth()">
              </p-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class LandingComponent {
  constructor(private router: Router) {}

  navigateToAuth() {
    this.router.navigate(['/auth']);
  }
}