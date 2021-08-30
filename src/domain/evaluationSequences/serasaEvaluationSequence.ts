import { UserEvaluationData } from 'src/interfaces/userEvaluationData';
import { EvaluationRule } from '../../interfaces/evaluationRule';

export class SerasaEvaluationSequence {
  public name = 'SerasaEvaluationSequence';
  private rules: EvaluationRule[];

  constructor(activeRules: EvaluationRule[]) {
    this.rules = activeRules;
  }

  public evaluate(
    userEvaluationData: UserEvaluationData,
    rulesToEvalute = this.rules,
    result = false,
  ) {
    if (result === false) return result;
    const ruleToEvaluate = rulesToEvalute.splice(0, 1)[0];
    if (!ruleToEvaluate) return result;
    const ruleEvaluation = ruleToEvaluate.execute(userEvaluationData);
    return ruleEvaluation;
  }
}
