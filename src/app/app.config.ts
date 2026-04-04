import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';

import { environment } from '../environments/environment';
import { FactService } from './services/fact.service';
import { FactMockService } from './services/fact.mock.service';
import { FactProductionService } from './services/fact.production.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
    {
      provide: FactService,
      useClass: environment.mockServices ? FactMockService : FactProductionService,
    },
  ],
};
