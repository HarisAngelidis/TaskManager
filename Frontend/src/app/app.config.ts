import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { HttpClientModule, withInterceptors } from '@angular/common/http';
import { MatSort, MatSortHeader, MatSortModule } from '@angular/material/sort';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';

import { AuthInterceptor } from './auth.interceptor';
import { MatTableModule } from '@angular/material/table';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(),provideHttpClient(withFetch()), provideAnimationsAsync()
    ,HttpClientModule, provideAnimationsAsync(),MatSortModule,MatSort,MatSortHeader,MatTableModule,
    provideHttpClient(withInterceptors([AuthInterceptor])),
    
  ]
};
