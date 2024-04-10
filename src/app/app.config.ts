import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { PreloadAllModules, provideRouter, withPreloading } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClientModule, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes,withPreloading(PreloadAllModules)),
    provideAnimationsAsync(),
    HttpClientModule,
    provideHttpClient(
      withFetch(),
      //withInterceptors([]) colocar un interceptor
    )

  ]
};
