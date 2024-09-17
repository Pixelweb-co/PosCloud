import { bootstrapApplication } from '@angular/platform-browser';

import { appConfig } from './app/app.config';
import { enableProdMode } from "@angular/core";
import { AppComponent } from './app/app.component';
import { LayoutComponent } from './app/layout/layout.component';


bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

