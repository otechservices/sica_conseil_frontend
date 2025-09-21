import { Component } from '@angular/core';

@Component({
  selector: 'app-public-footer',
  templateUrl: './public-footer.component.html'
})
export class PublicFooterComponent {
  isOpen = false;

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }
}
