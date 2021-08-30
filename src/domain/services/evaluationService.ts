import { Inject, Injectable } from '@nestjs/common';
import constants from 'src/constants';
import { EvaluationSequence } from 'src/interfaces/evaluationSequence';
import { UserEvaluationData } from 'src/interfaces/userEvaluationData';

@Injectable()
export class EvaluationService {
  constructor(
    @Inject(constants.ActiveSequencesProvider)
    private activeSequences: EvaluationSequence[],
  ) {}

  public evaluate(userEvaluationData: UserEvaluationData) {
    return this.activeSequences.reduce((result, activeSequence) => {
      const sequenceEvaluation = activeSequence.evaluate(userEvaluationData);
      result[activeSequence.name] = sequenceEvaluation;
      return result;
    }, {});
  }
}
