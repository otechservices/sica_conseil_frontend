import { Component, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../../../../core/utils/local-stoarge-service';
import { GlobalName } from '../../../../../core/utils/global-name';

@Component({
  selector: 'app-customer-header',

  templateUrl: './customer-header.component.html',
  styleUrl: './customer-header.component.css'
})
export class CustomerHeaderComponent {
  isOpen = false;

  constructor(private router: Router, private eRef: ElementRef,private lsService:LocalStorageService) {}

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  logout() {
    console.log('Déconnexion...');
    this.lsService.remove(GlobalName.tokenName)
    this.lsService.remove(GlobalName.userName)

    this.router.navigate(['/auth/login']);
  }

  // Fermer le dropdown si clic à l'extérieur
  @HostListener('document:click', ['$event'])
  clickOutside(event: MouseEvent) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }
}
