import { Observable } from 'rxjs';
import { Fact } from '../domain/fact.model';
import { FactRepository } from '../domain/fact.repository';

export class GetRandomFactUseCase {
  constructor(private readonly factRepository: FactRepository) {}

  execute(): Observable<Fact> {
    return this.factRepository.getRandomFact();
  }
}
