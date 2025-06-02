import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { Home } from '@views/home';

bootstrapApplication(Home, appConfig)
  .catch((err) => console.error(err));
