import { firstValueFrom, of } from 'rxjs';
import { Fact } from '../domain/fact.model';
import { GetRandomFactUseCase } from './get-random-fact.use-case';

describe('GetRandomFactUseCase', () => {
  const fact: Fact = {
    id: 'fact-id',
    text: 'A useful boundary test.',
    source: 'test-source',
    sourceUrl: 'https://example.com/source',
    language: 'en',
    permalink: 'https://example.com/facts/fact-id',
  };

  it('delegates to the fact repository', async () => {
    const repository = {
      getRandomFact: vi.fn(() => of(fact)),
    };
    const useCase = new GetRandomFactUseCase(repository);

    await firstValueFrom(useCase.execute());

    expect(repository.getRandomFact).toHaveBeenCalledOnce();
  });

  it('returns the repository result unchanged', async () => {
    const repository = {
      getRandomFact: vi.fn(() => of(fact)),
    };
    const useCase = new GetRandomFactUseCase(repository);

    await expect(firstValueFrom(useCase.execute())).resolves.toBe(fact);
  });
});
