import { EvaluationRule } from 'src/interfaces/evaluationRule';
import { UserEvaluationData } from 'src/interfaces/userEvaluationData';
import { CreditScorePointsPercentageInterval } from '../value-objects/creditScorePointsInterval';
import { ScoreRange } from '../value-objects/scoreRange';

export class CreditAmountRule implements EvaluationRule {
  private scoreRange: ScoreRange;
  private creditScorePointsIntervalLength: number;
  private creditScorePointsPercentageIntervals: CreditScorePointsPercentageInterval[];

  constructor() {
    const scoreRange = process.env.CREDIT_AMOUNT_RULE_RANGE.split('|')
      .map((range) => Number(range))
      .sort((a, b) => a - b);
    this.scoreRange = new ScoreRange(scoreRange[0], scoreRange[1]);
    this.creditScorePointsIntervalLength = Number(
      process.env.CREDIT_AMOUNT_RULE_CREDIT_SCORE_POINTS_INTERVAL_LENGTH,
    );
    this.creditScorePointsPercentageIntervals =
      this.calculateCreditScorePointsIntervals();
  }

  public execute(userEvaluationData: UserEvaluationData) {
    const userScoreInterval = this.findCreditScorePointIntervalByScore(
      userEvaluationData.score,
    );
    const userCreditAmount =
      userEvaluationData.income * userScoreInterval.incomePercentageValue;
    return { creditAvailable: userCreditAmount };
  }

  private calculateIntervalScorePoints() {
    return this.scoreRange.maximum - this.scoreRange.minimum;
  }

  private calculateCreditScorePointsIntervals(): CreditScorePointsPercentageInterval[] {
    const intervalScorePoints = this.calculateIntervalScorePoints();
    const creditIntervalsAmount =
      intervalScorePoints / this.creditScorePointsIntervalLength;
    return Array.from(Array(creditIntervalsAmount).keys()).map(
      (intervalPointsMultiplier) => {
        const maximum =
          this.creditScorePointsIntervalLength * intervalPointsMultiplier + 500;
        const minimum = maximum - this.creditScorePointsIntervalLength;
        const value = 1 / (creditIntervalsAmount - intervalPointsMultiplier);
        return new CreditScorePointsPercentageInterval(minimum, maximum, value);
      },
    );
  }

  private findCreditScorePointIntervalByScore(userScore: number) {
    return this.creditScorePointsPercentageIntervals.find(
      (interval) =>
        userScore >= interval.minimum && userScore <= interval.maximum,
    );
  }
}
