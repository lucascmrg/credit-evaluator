import { Inject, Injectable } from '@nestjs/common';
import { DatabaseProvider } from '../../interfaces/databaseProvider';

@Injectable()
export class EvaluationRepository {
  constructor(
    @Inject(DatabaseProvider) private databaseProvider: DatabaseProvider,
  ) {}

  save(evaluation) {
    return this.databaseProvider.save(evaluation);
  }
}
