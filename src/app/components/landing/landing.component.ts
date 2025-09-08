import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, ButtonModule, CardModule],
  templateUrl: './landing.component.html',
  styleUrls: []
})
export class LandingComponent {
  constructor(private router: Router) {}

  navigateToAuth() {
    this.router.navigate(['/auth']);
  }
}