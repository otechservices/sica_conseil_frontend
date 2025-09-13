import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./app.module').then(m => m.AppModule)
      }
];
