import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/characters?page=1',
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () => import('./views/views.routes').then((m) => m.views)
  },
  {
    path: '**',
    redirectTo: '/characters?page=1'
  }
];
