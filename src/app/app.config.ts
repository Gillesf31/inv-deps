import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';

import { environment } from '../environments/environment';
import { GetRandomFactUseCase } from './facts/application/get-random-fact.use-case';
import { FactRepository } from './facts/domain/fact.repository';
import { HttpFactRepository } from './facts/infrastructure/http-fact.repository';
import { MockFactRepository } from './facts/infrastructure/mock-fact.repository';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
    {
      provide: FactRepository,
      useClass: environment.mockServices ? MockFactRepository : HttpFactRepository,
    },
    {
      provide: GetRandomFactUseCase,
      useFactory: (factRepository: FactRepository) => new GetRandomFactUseCase(factRepository),
      deps: [FactRepository],
    },
  ],
};
