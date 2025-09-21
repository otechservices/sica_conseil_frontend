import { Component } from '@angular/core';
import { NavigationService } from '../../../services/navigation.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  isMenuOpen = false;

  constructor(
    private navigationService: NavigationService,
    private translate: TranslateService,
  ) {
        this.translate.setDefaultLang('fr'); // langue par défaut
        this.translate.use('fr');            // active la langue

  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  navigate(path: string) {
    this.navigationService.navigate(path);
  }
}
