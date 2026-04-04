import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FactInterface } from '../models/fact.model';
import { FactService } from './fact.service';

export class FactProductionService extends FactService {
  private readonly http = inject(HttpClient);

  override getRandomFact(): Observable<FactInterface> {
    return this.http.get<FactInterface>('https://uselessfacts.jsph.pl/api/v2/facts/random');
  }
}
