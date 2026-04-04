import { Observable } from 'rxjs';
import { FactInterface } from '../models/fact.model';

export abstract class FactService {
  abstract getRandomFact(): Observable<FactInterface>;
}
