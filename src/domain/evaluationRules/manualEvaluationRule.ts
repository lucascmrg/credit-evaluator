import { EvaluationRule } from 'src/interfaces/evaluationRule';
import { UserEvaluationData } from 'src/interfaces/userEvaluationData';
import { ScoreRange } from '../value-objects/scoreRange';

export class ManualEvaluationRule implements EvaluationRule {
  public name = 'ManualEvaluationRule';
  private scoreRange: ScoreRange;

  constructor() {
    const scoreRange = process.env.MANUAL_EVALUATION_RULE_RANGE.split('|')
      .map((range) => Number(range))
      .sort((a, b) => a - b);
    this.scoreRange = new ScoreRange(scoreRange[0], scoreRange[1]);
  }

  public execute(userEvaluationData: UserEvaluationData): boolean {
    if (this.isScoreInRange(userEvaluationData.score)) return false;
    return true;
  }

  private isScoreInRange(userScore: number): boolean {
    return (
      userScore >= this.scoreRange.minimum &&
      userScore < this.scoreRange.maximum
    );
  }
}
