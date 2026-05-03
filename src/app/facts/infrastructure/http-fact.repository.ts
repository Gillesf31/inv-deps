import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Fact } from '../domain/fact.model';
import { FactRepository } from '../domain/fact.repository';
import { FactApiDto } from './fact-api.dto';

const RANDOM_FACT_URL = 'https://uselessfacts.jsph.pl/api/v2/facts/random';

export class HttpFactRepository extends FactRepository {
  private readonly http = inject(HttpClient);

  override getRandomFact(): Observable<Fact> {
    return this.http.get<FactApiDto>(RANDOM_FACT_URL).pipe(map((dto) => this.toDomain(dto)));
  }

  private toDomain(dto: FactApiDto): Fact {
    return {
      id: dto.id,
      text: dto.text,
      source: dto.source,
      sourceUrl: dto.source_url,
      language: dto.language,
      permalink: dto.permalink,
    };
  }
}
