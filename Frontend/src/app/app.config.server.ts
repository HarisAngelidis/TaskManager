import { ApplicationConfig, mergeApplicationConfig } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { appConfig } from './app.config';
import { provideServerRendering } from '@angular/platform-server';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),HttpClientModule
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
