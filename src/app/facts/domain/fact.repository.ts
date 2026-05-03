import { Observable } from 'rxjs';
import { Fact } from './fact.model';

export abstract class FactRepository {
  abstract getRandomFact(): Observable<Fact>;
}
