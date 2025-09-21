import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NavigationService } from '../../../../../core/services/navigation.service';

@Component({
  selector: 'app-public-header',
  templateUrl: './public-header.component.html'
})
export class PublicHeaderComponent {
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
