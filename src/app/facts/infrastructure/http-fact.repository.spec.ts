import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { Fact } from '../domain/fact.model';
import { HttpFactRepository } from './http-fact.repository';

describe('HttpFactRepository', () => {
  const randomFactUrl = 'https://uselessfacts.jsph.pl/api/v2/facts/random';

  let httpTesting: HttpTestingController;
  let repository: HttpFactRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), HttpFactRepository],
    });

    httpTesting = TestBed.inject(HttpTestingController);
    repository = TestBed.inject(HttpFactRepository);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('calls the random fact API and maps the DTO to the domain model', () => {
    let actual: Fact | undefined;

    repository.getRandomFact().subscribe((fact) => {
      actual = fact;
    });

    const request = httpTesting.expectOne(randomFactUrl);

    expect(request.request.method).toBe('GET');

    request.flush({
      id: 'api-id',
      text: 'The API returns snake case.',
      source: 'api-source',
      source_url: 'https://example.com/api-source',
      language: 'en',
      permalink: 'https://example.com/facts/api-id',
    });

    expect(actual).toEqual({
      id: 'api-id',
      text: 'The API returns snake case.',
      source: 'api-source',
      sourceUrl: 'https://example.com/api-source',
      language: 'en',
      permalink: 'https://example.com/facts/api-id',
    });
  });
});
