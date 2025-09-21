import { CanActivateFn, Router } from '@angular/router';
import { PermissionService } from '../services/permission.service';
import { inject } from '@angular/core';

export const PermissionCheckGuard: CanActivateFn = (route, state) => {
    const currentUrl = state.url; // ex: /admin/dossiers
    const permissionService = inject(PermissionService);
    const router = inject(Router);

    if (currentUrl.includes('dossiers')) {
          const can = permissionService.canShow(['DOSSIER'], 'LISTER');

          if (!can) {
           router.navigate(['/admin/unauthorized'])
            return false;
          }
    }

  console.log(currentUrl);
  return true;
};

