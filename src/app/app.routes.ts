import { Routes } from '@angular/router';
import { Home } from './views/home/home'; 
import { FormView } from './views/form/form';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'type', component: FormView },
  { path: '**', redirectTo: '' },
];