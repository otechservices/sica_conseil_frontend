import { Component } from '@angular/core';
import { NavigationService } from '../../../../../core/services/navigation.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
})
export class AdminHeaderComponent {
  constructor(private nav: NavigationService) {}

  goHome() { this.nav.navigate('/'); }
}
