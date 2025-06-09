import { Routes } from '@angular/router';
import { Home } from '@views/home/home'; 
import { FormView } from '@views/form/form';
import { ProductsView } from '@views/products/products.view';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'type', component: FormView },
  { path: 'products', component: ProductsView },
  { path: '**', redirectTo: '' },
];