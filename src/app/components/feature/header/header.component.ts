import { Component } from '@angular/core';
import { NavigationService } from '../../../services/navigation.service';
import { I18nService } from '../../../services/i18n.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  isMenuOpen = false;

  constructor(
    private navigationService: NavigationService,
    public i18n: I18nService
  ) {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  navigate(path: string) {
    this.navigationService.navigate(path);
  }
}
