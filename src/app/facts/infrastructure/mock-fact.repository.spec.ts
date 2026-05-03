import { Fact } from '../domain/fact.model';
import { MockFactRepository } from './mock-fact.repository';

describe('MockFactRepository', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns a domain fact after the artificial delay', () => {
    vi.useFakeTimers();

    const repository = new MockFactRepository();
    let actual: Fact | undefined;

    repository.getRandomFact().subscribe((fact) => {
      actual = fact;
    });

    vi.advanceTimersByTime(999);
    expect(actual).toBeUndefined();

    vi.advanceTimersByTime(1);
    expect(actual).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        text: expect.any(String),
        source: expect.any(String),
        sourceUrl: expect.any(String),
        language: 'en',
        permalink: expect.any(String),
      }),
    );
  });
});
