import { Injectable } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private router: Router) { }

  navigate(url: string, extras?: NavigationExtras): Promise<boolean> {
    return this.router.navigateByUrl(url, extras);
  }

  navigateByUrl(url: string): Promise<boolean> {
    return this.router.navigateByUrl(url);
  }

  navigateToLogin(): Promise<boolean> {
    return this.router.navigate(['/login']);
  }

  navigateToDashboard(): Promise<boolean> {
    return this.router.navigate(['/dashboard']);
  }
}
