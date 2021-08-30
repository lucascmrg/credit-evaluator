import { EvaluationRule } from 'src/interfaces/evaluationRule';
import { UserEvaluationData } from 'src/interfaces/userEvaluationData';

export class MinimumScoreRule implements EvaluationRule {
  public name = 'MinimumScoreRule';
  private minimumScore: number;

  constructor() {
    this.minimumScore = Number(process.env.MINIMUM_SCORE);
  }

  public execute(userEvaluationData: UserEvaluationData): boolean {
    if (userEvaluationData.score > this.minimumScore) return false;
    return true;
  }
}
