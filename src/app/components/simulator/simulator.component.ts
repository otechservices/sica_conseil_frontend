import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ProgressBarModule } from 'primeng/progressbar';

@Component({
  selector: 'app-simulator',
  standalone: true,
  imports: [CommonModule, RouterModule, CardModule, ButtonModule, ProgressBarModule],
  templateUrl: './simulator.component.html',
  styleUrls: ['./simulator.component.css']
})
export class SimulatorComponent {
  constructor(private router: Router) {}

  onReturnToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}