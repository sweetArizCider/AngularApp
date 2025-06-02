import { Routes } from '@angular/router';
import { Home } from '@views/home';
import { TableView } from '@views/table/table';

export const routes: Routes = [
  { path: '', component: Home},
  { path: 'table', component: TableView },
];
