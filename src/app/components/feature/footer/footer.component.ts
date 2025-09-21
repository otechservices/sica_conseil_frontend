import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  isOpen = false;

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }
}
