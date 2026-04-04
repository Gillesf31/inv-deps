import { Observable, of } from 'rxjs';
import { FactInterface } from '../models/fact.model';
import { FactService } from './fact.service';

export class FactMockService extends FactService {
  private readonly facts: FactInterface[] = [
    {
      id: '4221d347c862ef3cbf5c198b596acb2e',
      text: 'The giant squid has the largest eyes in the world.',
      source: 'djtech.net',
      source_url: 'http://www.djtech.net/humor/useless_facts.htm',
      language: 'en',
      permalink: 'https://uselessfacts.jsph.pl/api/v2/facts/4221d347c862ef3cbf5c198b596acb2e',
    },
    {
      id: 'b0a0e8b6e46a9e2c1e3f4b5d6a7c8e9f',
      text: 'A snail can sleep for three years.',
      source: 'djtech.net',
      source_url: 'http://www.djtech.net/humor/useless_facts.htm',
      language: 'en',
      permalink: 'https://uselessfacts.jsph.pl/api/v2/facts/b0a0e8b6e46a9e2c1e3f4b5d6a7c8e9f',
    },
    {
      id: 'c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6',
      text: 'Honey never spoils. Archaeologists have found 3000-year-old honey in Egyptian tombs that was still edible.',
      source: 'djtech.net',
      source_url: 'http://www.djtech.net/humor/useless_facts.htm',
      language: 'en',
      permalink: 'https://uselessfacts.jsph.pl/api/v2/facts/c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6',
    },
    {
      id: 'd2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7',
      text: 'Octopuses have three hearts, two of which stop beating when they swim.',
      source: 'djtech.net',
      source_url: 'http://www.djtech.net/humor/useless_facts.htm',
      language: 'en',
      permalink: 'https://uselessfacts.jsph.pl/api/v2/facts/d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7',
    },
    {
      id: 'e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8',
      text: 'A day on Venus is longer than a year on Venus.',
      source: 'djtech.net',
      source_url: 'http://www.djtech.net/humor/useless_facts.htm',
      language: 'en',
      permalink: 'https://uselessfacts.jsph.pl/api/v2/facts/e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8',
    },
  ];

  override getRandomFact(): Observable<FactInterface> {
    const fact = this.facts[Math.floor(Math.random() * this.facts.length)];
    return of(fact);
  }
}
