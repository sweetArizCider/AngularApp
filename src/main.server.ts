import { bootstrapApplication } from '@angular/platform-browser';
import { Home } from '@views/home';
import { config } from './app/app.config.server';

const bootstrap = () => bootstrapApplication(Home, config);

export default bootstrap;
