import { Routes } from '@angular/router';
import { Home } from '@views/home/home';
import { FormView } from '@views/form/form';
import { ProductsView } from '@views/products/products.view';
import {LoginView} from '@views/login/login.view';
import { RegisterView } from '@views/register/register.view';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'type', component: FormView },
  { path: 'products', component: ProductsView },
  { path: 'login', component: LoginView},
  { path: 'register', component: RegisterView},
  { path: '**', redirectTo: '' },
];
