import { Routes } from '@angular/router';

export const views: Routes = [
  {
    path: '',
    redirectTo: '/characters?page=1',
    pathMatch: 'full'
  },
  {
    path: 'characters',
    loadComponent: () => import('./characters/characters.component').then((m) => m.CharactersComponent)
  },
  {
    path: 'locations',
    loadComponent: () => import('./locations/locations.component').then((m) => m.LocationsComponent)
  },
  {
    path: 'episodes',
    loadComponent: () => import('./episodes/episodes.component').then((m) => m.EpisodesComponent)
  },
  {
    path: 'character/:id',
    loadComponent: () => import('./character/character.component').then((m) => m.CharacterComponent)
  },
  {
    path: '**',
    redirectTo: '/characters?page=1'
  }
];
