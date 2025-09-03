import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      <!-- Header -->
      <nav class="bg-white shadow-sm border-b">
        <div class="container mx-auto px-6 py-4">
          <div class="flex justify-between items-center">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                <span class="text-white font-bold text-sm">SC</span>
              </div>
              <span class="text-xl font-bold text-gray-900">SICA CONSEIL</span>
            </div>
            <div class="space-x-4">
              <p-button 
                label="Se connecter" 
                [outlined]="true"
                severity="secondary"
                (onClick)="navigateToAuth()"
                class="mr-2">
              </p-button>
              <p-button 
                label="S'inscrire" 
                severity="warning"
                (onClick)="navigateToAuth()">
              </p-button>
            </div>
          </div>
        </div>
      </nav>

      <!-- Hero Section -->
      <div class="container mx-auto px-6 py-20">
        <div class="text-center max-w-4xl mx-auto">
          <h1 class="text-5xl font-bold text-gray-900 mb-6">
            Votre plateforme complète pour la 
            <span class="text-orange-500">certification PMP</span>
          </h1>
          <p class="text-xl text-gray-600 mb-8 leading-relaxed">
            Préparez-vous efficacement avec des questions authentiques du PMI Institute, 
            des simulateurs d'examen et une formation complète
          </p>
          
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <p-button 
              label="Commencer gratuitement" 
              severity="warning"
              size="large"
              icon="pi pi-arrow-right"
              iconPos="right"
              (onClick)="navigateToAuth()"
              class="px-8 py-3">
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

      <!-- Features Section -->
      <div class="bg-white py-20">
        <div class="container mx-auto px-6">
          <div class="text-center mb-16">
            <h2 class="text-3xl font-bold text-gray-900 mb-4">
              Tout ce dont vous avez besoin pour réussir
            </h2>
            <p class="text-gray-600 max-w-2xl mx-auto">
              Une approche complète et structurée pour votre certification PMP
            </p>
          </div>
          
          <div class="grid md:grid-cols-3 gap-8">
            <div class="text-center p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div class="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i class="pi pi-book text-2xl text-orange-500"></i>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-3">Formation PMP</h3>
              <p class="text-gray-600">
                Modules de formation complets couvrant tous les domaines du PMP
              </p>
            </div>
            
            <div class="text-center p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i class="pi pi-calculator text-2xl text-blue-500"></i>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-3">Simulateur PMP</h3>
              <p class="text-gray-600">
                Tests authentiques avec questions du PMI Institute
              </p>
            </div>
            
            <div class="text-center p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i class="pi pi-folder text-2xl text-green-500"></i>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-3">Générateur de projets</h3>
              <p class="text-gray-600">
                Créez et gérez vos projets avec les meilleures pratiques
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA Section -->
      <div class="bg-gradient-to-r from-orange-500 to-amber-500 py-16">
        <div class="container mx-auto px-6 text-center">
          <h2 class="text-3xl font-bold text-white mb-4">
            Prêt à commencer votre certification PMP ?
          </h2>
          <p class="text-orange-100 mb-8 text-lg">
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
  `
})
export class LandingComponent {
  constructor(private router: Router) {}

  navigateToAuth() {
    this.router.navigate(['/auth']);
  }
}