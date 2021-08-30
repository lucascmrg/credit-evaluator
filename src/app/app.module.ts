import { Module } from '@nestjs/common';
import constants from '../constants';
import { EvaluationService } from '../domain/services/evaluationService';
import { EvaluationController } from './controllers/evaluation.controller';
import { DatabaseProviderFactory } from '../factories/databaseProviderFactory';
import { SequenceFactory } from '../factories/sequencesFactory';
import { DatabaseProvider } from '../interfaces/databaseProvider';
import { EvaluationRepository } from './repository/evaluationRepository';
import { SerasaService } from '../services/serasaService';
import { ConfigModule } from '@nestjs/config';
import { EvaluateUserCredit } from './useCases/evaluateUserCredit';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [EvaluationController],
  providers: [
    SerasaService,
    EvaluationService,
    EvaluationRepository,
    EvaluateUserCredit,
    {
      provide: DatabaseProvider,
      useValue: new DatabaseProviderFactory().getActiveDatabase(),
    },
    {
      provide: constants.ActiveSequencesProvider,
      useValue: new SequenceFactory().getActiveSequences(),
    },
  ],
})
export class AppModule {}
