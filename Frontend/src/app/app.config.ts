import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { ApplicationConfig } from '@angular/core';
import { AuthInterceptor } from './auth.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(),provideHttpClient(withFetch()), provideAnimationsAsync()
    ,HttpClientModule,AuthInterceptor
    
  ]
};
