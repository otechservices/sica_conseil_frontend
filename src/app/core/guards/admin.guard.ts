import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { GlobalName } from '../utils/global-name';
import { LocalStorageService } from '../utils/local-stoarge-service';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  constructor(private lsService: LocalStorageService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = this.lsService.get(GlobalName.tokenName);
    if (!token) {
      this.router.navigate(['/auth/login']);
      return false;
    }
    const user = this.lsService.get(GlobalName.userName);
    const roles: string[] = (user?.roles ?? []).map((r: any) => r.name);
    if (roles.some(r => ['Super Admin', 'Admin'].includes(r))) {
      return true;
    }
    this.router.navigate(['/customer/dashboard']);
    return false;
  }
}
