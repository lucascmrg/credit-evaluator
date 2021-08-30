import { Inject } from '@nestjs/common';
import { EvaluationService } from 'src/domain/services/evaluationService';
import { EvaluationRequest } from 'src/interfaces/evaluationRequest';
import { EvaluationRepository } from 'src/app/repository/evaluationRepository';
import { SerasaService } from 'src/services/serasaService';

export class EvaluateUserCredit {
  constructor(
    @Inject(EvaluationService) private evaluationService: EvaluationService,
    @Inject(SerasaService) private serasaService: SerasaService,
    @Inject(EvaluationRepository)
    private evaluationRepository: EvaluationRepository,
  ) {}
  public evaluate(evaluationRequest: EvaluationRequest) {
    const serasaScore = this.serasaService.findScore(
      evaluationRequest.document,
    );
    const userEvaluationData = { ...evaluationRequest, ...serasaScore };
    const evaluation = this.evaluationService.evaluate(userEvaluationData);
    this.evaluationRepository.save(evaluation);
    return evaluation;
  }
}
