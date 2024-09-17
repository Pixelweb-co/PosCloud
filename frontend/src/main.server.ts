import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';
import { LayoutComponent } from './app/layout/layout.component';

const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;
